import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router";
import { useCreateAuction } from "../hooks/useAuction.js";
import { useDocumentTitle } from "../hooks/useDocumentTitle.js";
import {
  getUploadSignature,
  uploadImageToCloudinary,
} from "../services/auction.service.js";

export const CreateAuction = () => {
  useDocumentTitle("Create Auction");
  const navigate = useNavigate();

  const fileInputRef = useRef(null);
  const previewUrlRef = useRef("");
  const uploadedMetaRef = useRef({
    formId: "",
    public_id: "",
    secure_url: "",
  });

  const [error, setError] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [previewUrl, setPreviewUrl] = useState("");
  const [selectedFileName, setSelectedFileName] = useState("");

  const [formData, setFormData] = useState({
    itemName: "",
    itemDescription: "",
    itemCategory: "",
    startingPrice: "",
    itemStartDate: "",
    itemEndDate: "",
  });

  useEffect(() => {
    return () => {
      if (previewUrlRef.current) {
        URL.revokeObjectURL(previewUrlRef.current);
      }
    };
  }, []);

  const { mutate, isPending } = useCreateAuction({
    onSuccess: (data) => {
      setFormData({
        itemName: "",
        itemDescription: "",
        itemCategory: "",
        startingPrice: "",
        itemStartDate: "",
        itemEndDate: "",
      });

      if (previewUrlRef.current) {
        URL.revokeObjectURL(previewUrlRef.current);
      }
      previewUrlRef.current = "";
      setPreviewUrl("");
      setSelectedFileName("");
      setUploadProgress(0);
      setIsUploading(false);
      uploadedMetaRef.current = { formId: "", public_id: "", secure_url: "" };
      if (fileInputRef.current) fileInputRef.current.value = "";

      setError("");
      navigate(`/auction/${data.newAuction._id}`);
    },
    onError: (err) =>
      setError(err?.response?.data?.message || "Something went wrong"),
  });

  const categories = [
    "Electronics",
    "Antiques",
    "Art",
    "Books",
    "Clothing",
    "Collectibles",
    "Home & Garden",
    "Jewelry",
    "Musical Instruments",
    "Sports",
    "Toys",
    "Vehicles",
    "Other",
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setError("");
  };

  const clearUploadedImage = () => {
    if (previewUrlRef.current) {
      URL.revokeObjectURL(previewUrlRef.current);
    }
    previewUrlRef.current = "";
    setPreviewUrl("");
    setSelectedFileName("");
    setUploadProgress(0);
    setIsUploading(false);

    uploadedMetaRef.current = {
      formId: "",
      public_id: "",
      secure_url: "",
    };

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleFileChange = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const fileSizeMB = file.size / (1024 * 1024);

    if (!file.type.startsWith("image/")) {
      setError("Only image files are allowed.");
      if (fileInputRef.current) fileInputRef.current.value = "";
      return;
    }

    if (fileSizeMB > 5) {
      setError("File size must be less than 5 MB.");
      if (fileInputRef.current) fileInputRef.current.value = "";
      return;
    }

    setError("");

    // Instant local preview
    if (previewUrlRef.current) {
      URL.revokeObjectURL(previewUrlRef.current);
    }
    const localPreview = URL.createObjectURL(file);
    previewUrlRef.current = localPreview;
    setPreviewUrl(localPreview);
    setSelectedFileName(file.name);

    uploadedMetaRef.current = { formId: "", public_id: "", secure_url: "" };
    setUploadProgress(0);
    setIsUploading(true);

    try {
      const signatureRes = await getUploadSignature();
      const signatureData = signatureRes?.data;

      if (!signatureData?.formId) {
        throw new Error("Failed to initialize upload session");
      }

      const uploadRes = await uploadImageToCloudinary({
        file,
        signatureData,
        onProgress: (percent) => setUploadProgress(percent),
      });

      const public_id = uploadRes?.public_id;
      const secure_url = uploadRes?.secure_url;

      if (!public_id || !secure_url) {
        throw new Error("Cloud upload failed");
      }

      uploadedMetaRef.current = {
        formId: signatureData.formId,
        public_id,
        secure_url,
      };

      setUploadProgress(100);
    } catch (err) {
      uploadedMetaRef.current = { formId: "", public_id: "", secure_url: "" };
      setError(
        err?.response?.data?.message ||
          err?.message ||
          "Image upload failed. Please try again.",
      );
    } finally {
      setIsUploading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const uploadMeta = uploadedMetaRef.current;
    if (!uploadMeta.formId || !uploadMeta.public_id || !uploadMeta.secure_url) {
      setError(
        isUploading
          ? "Image upload is in progress. Please wait."
          : "Please upload an image first.",
      );
      return;
    }

    const start = new Date(formData.itemStartDate);
    const end = new Date(formData.itemEndDate);

    if (end <= start) {
      setError("End date must be after start date.");
      return;
    }

    // Divide input Rupee price by 100 before transmitting to database
    mutate({
      ...formData,
      startingPrice: Number(formData.startingPrice) / 100,
      formId: uploadMeta.formId,
      public_id: uploadMeta.public_id,
      secure_url: uploadMeta.secure_url,
    });
  };

  const today = new Date().toISOString().split("T")[0];

  const maxStart = new Date();
  maxStart.setDate(maxStart.getDate() + 15);
  const maxStartDate = maxStart.toISOString().split("T")[0];

  let maxEndDate = "";
  if (formData.itemStartDate) {
    const end = new Date(formData.itemStartDate);
    end.setDate(end.getDate() + 15);
    maxEndDate = end.toISOString().split("T")[0];
  }

  const submitDisabled = isPending || isUploading;

  return (
    <div className="min-h-screen bg-[#fdfaf2] text-[#2a2421] font-mono">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-6 sm:py-10">
        <button
          onClick={() => navigate(-1)}
          type="button"
          className="inline-flex items-center gap-2 border-2 border-[#2a2421] px-4 py-1.5 hover:bg-[#2a2421]/10 transition mb-6 uppercase font-bold text-xs bg-white"
        >
          &larr; BACK
        </button>

        <div className="mb-8">
          <h1 className="text-3xl font-bold uppercase tracking-wider text-[#2a2421] crt-glow">
            CREATE AUCTION SEQUENCE
          </h1>
          <p className="text-xs text-[#2a2421]/60 mt-1 uppercase">
            Initialize new asset listing on the network
          </p>
        </div>

        <div className="bg-[#fdfaf2] border-2 border-[#2a2421] shadow-[4px_4px_0px_0px_#f2785d]">
          <div className="p-6 sm:p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label
                  htmlFor="itemName"
                  className="block text-xs font-bold uppercase tracking-wider text-[#2a2421]/80 mb-1.5"
                >
                  Item Name
                </label>
                <input
                  type="text"
                  id="itemName"
                  name="itemName"
                  value={formData.itemName}
                  onChange={handleInputChange}
                  className="retro-input w-full px-4 py-3"
                  placeholder="e.g. VINTAGE MECHANICAL CLOCK"
                  required
                />
              </div>

              <div>
                <label
                  htmlFor="itemDescription"
                  className="block text-xs font-bold uppercase tracking-wider text-[#2a2421]/80 mb-1.5"
                >
                  Description
                </label>
                <textarea
                  id="itemDescription"
                  name="itemDescription"
                  value={formData.itemDescription}
                  onChange={handleInputChange}
                  rows={4}
                  className="retro-input w-full px-4 py-3 resize-vertical"
                  placeholder="INPUT SPECIFICATIONS, CONDITION MATRIX, AND RELEVANT HISTORY..."
                  required
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label
                    htmlFor="itemCategory"
                    className="block text-xs font-bold uppercase tracking-wider text-[#2a2421]/80 mb-1.5"
                  >
                    Category
                  </label>
                  <select
                    id="itemCategory"
                    name="itemCategory"
                    value={formData.itemCategory}
                    onChange={handleInputChange}
                    className="retro-input w-full px-4 py-3"
                    required
                  >
                    <option value="">SELECT CATEGORY</option>
                    {categories.map((category) => (
                      <option key={category} value={category}>
                        {category.toUpperCase()}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label
                    htmlFor="startingPrice"
                    className="block text-xs font-bold uppercase tracking-wider text-[#2a2421]/80 mb-1.5"
                  >
                    Starting Price (₹)
                  </label>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[#2a2421] font-bold">
                      ₹
                    </span>
                    <input
                      type="number"
                      id="startingPrice"
                      name="startingPrice"
                      value={formData.startingPrice}
                      onChange={handleInputChange}
                      min="1"
                      step="1"
                      className="retro-input w-full pl-10 pr-4 py-3"
                      placeholder="1000"
                      required
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label
                    htmlFor="itemStartDate"
                    className="block text-xs font-bold uppercase tracking-wider text-[#2a2421]/80 mb-1.5"
                  >
                    Start Date
                  </label>
                  <input
                    type="date"
                    id="itemStartDate"
                    name="itemStartDate"
                    min={today}
                    value={formData.itemStartDate}
                    max={maxStartDate}
                    onChange={handleInputChange}
                    className="retro-input w-full px-4 py-3 uppercase"
                    required
                  />
                </div>

                <div>
                  <label
                    htmlFor="itemEndDate"
                    className="block text-xs font-bold uppercase tracking-wider text-[#2a2421]/80 mb-1.5"
                  >
                    End Date
                  </label>
                  <input
                    type="date"
                    id="itemEndDate"
                    name="itemEndDate"
                    value={formData.itemEndDate}
                    onChange={handleInputChange}
                    min={formData.itemStartDate}
                    max={maxEndDate}
                    className="retro-input w-full px-4 py-3 uppercase"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#2a2421]/80 mb-1.5">
                  Asset Visual Frame (Image)
                </label>

                {!previewUrl ? (
                  <label
                    htmlFor="itemPhoto"
                    className="flex flex-col items-center justify-center w-full h-44 border-2 border-dashed border-[#2a2421]/20 bg-white cursor-pointer hover:bg-gray-50 hover:border-[#2a2421]/60 transition-colors"
                  >
                    <svg
                      className="w-8 h-8 text-[#2a2421]/40 mb-2"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.5}
                        d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                      />
                    </svg>
                    <p className="text-xs text-[#2a2421]/65 uppercase font-bold">
                      CLICK TO UPLOAD IMAGE
                    </p>
                    <p className="text-[10px] text-[#2a2421]/40 mt-1">
                      MAX FILE LIMIT: 5 MB
                    </p>
                    <input
                      type="file"
                      id="itemPhoto"
                      name="itemPhoto"
                      onChange={handleFileChange}
                      ref={fileInputRef}
                      accept="image/*"
                      className="hidden"
                      disabled={isUploading}
                    />
                  </label>
                ) : (
                  <div className="relative inline-block border-2 border-[#2a2421] p-1 bg-white">
                    <img
                      src={previewUrl}
                      alt="Preview"
                      className="w-44 h-44 object-cover"
                    />

                    <button
                      type="button"
                      onClick={clearUploadedImage}
                      className="absolute -top-2.5 -right-2.5 bg-white border-2 border-[#f2785d] text-[#f2785d] hover:bg-[#f2785d] hover:text-white p-0.5 shadow-sm transition"
                    >
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2.5}
                          d="M6 18L18 6M6 6l12 12"
                        />
                      </svg>
                    </button>

                    <div className="mt-3 w-44">
                      <div className="flex items-center justify-between text-[10px] text-[#2a2421]/75 mb-1 font-bold">
                        <span className="truncate pr-2">
                          {selectedFileName}
                        </span>
                        <span className="tabular-nums">{uploadProgress}%</span>
                      </div>
                      <div className="h-2 w-full bg-white border border-[#2a2421]/20 overflow-hidden">
                        <div
                          className={`h-full transition-all duration-200 ${
                            uploadProgress === 100
                              ? "bg-[#f2785d]"
                              : "bg-[#7da89f]"
                          }`}
                          style={{ width: `${uploadProgress}%` }}
                        />
                      </div>
                      <p className="text-[9px] text-[#2a2421]/50 mt-1 uppercase font-bold">
                        {isUploading
                          ? "TRANSMITTING..."
                          : uploadProgress === 100
                            ? "TRANSFER SUCCESS"
                            : "STANDBY"}
                      </p>
                    </div>
                  </div>
                )}
              </div>

              {error && (
                <div className="bg-[#f2785d]/10 border-2 border-[#f2785d] text-[#f2785d] px-4 py-3 text-xs uppercase font-bold">
                  [ERROR] {error}
                </div>
              )}

              <div className="pt-4 border-t border-[#2a2421]/20">
                <button
                  type="submit"
                  disabled={submitDisabled}
                  className="retro-btn"
                >
                  {isUploading
                    ? "UPLOADING..."
                    : isPending
                      ? "TRANSMITTING..."
                      : "EXECUTE LISTING"}
                </button>
              </div>
            </form>
          </div>
        </div>

        <HelpSection />
      </div>
    </div>
  );
};

export const HelpSection = () => {
  const tips = [
    "USE HIGH-RESOLUTION SCANNER OR PHOTOGRAPHY MODULES",
    "SPECIFY FAULTS, SCRATCHES, OR PHYSICAL CHASSIS DEGRADATIONS IN THE LOG",
    "SET ACCURATE CATEGORY IDENTIFIERS TO EXPEDITE DISCOVERY TIMES",
    "3-7 DAY TIME WINDOWS TYPICALLY YIELD OPTIMAL BID RETENTION RATES",
  ];

  return (
    <div className="mt-6 bg-[#fdfaf2] border-2 border-[#e5b25d] shadow-[4px_4px_0px_0px_#e5b25d] p-5">
      <h3 className="text-sm font-bold uppercase text-[#e5b25d] mb-3 tracking-wider">
        // ADVISORY BULLETIN LISTING GUIDELINES
      </h3>
      <ul className="space-y-2 text-xs text-[#e5b25d] font-bold">
        {tips.map((tip, i) => (
          <li key={i} className="flex items-start gap-2">
            <span>&#187;</span>
            <span>{tip}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};
