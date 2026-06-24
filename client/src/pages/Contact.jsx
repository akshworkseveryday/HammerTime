import { useState } from "react";
import { FiSend } from "react-icons/fi";
import { useSendMessage } from "../hooks/useContact";
import { useDocumentTitle } from "../hooks/useDocumentTitle";

export const Contact = () => {
  useDocumentTitle("Contact Us");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [isError, setIsError] = useState("");

  const { isPending, mutate } = useSendMessage({
    onSuccess: () => {
      setFormData({
        name: "",
        email: "",
        subject: "",
        message: "",
      });
      setSubmitted(true);
    },
    onError: (error) => {
      setIsError(error?.response?.data?.error || "something went wrong");
      setTimeout(() => {
        setIsError("");
      }, 10000);
    },
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    mutate(formData);
  };

  return (
    <div className="min-h-screen bg-[#fdfaf2] text-[#2a2421] font-mono">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-10 sm:py-16">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-12 h-12 border-2 border-[#2a2421] bg-[#fdfaf2] text-[#2a2421] mb-4 text-xl shadow-[2px_2px_0px_0px_#f2785d]">
            ✉️
          </div>
          <h1 className="text-3xl font-bold uppercase tracking-wider text-[#2a2421] crt-glow">
            CONTACT CENTER
          </h1>
          <p className="text-xs text-[#2a2421]/50 mt-2 max-w-md mx-auto uppercase">
            Have a question or feedback? Initiate a message transmission.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          {/* Info cards */}
          <div className="lg:col-span-2 space-y-5">
            <div className="retro-card p-5">
              <div className="flex items-start gap-4">
                <div className="w-9 h-9 border-2 border-[#2a2421] text-[#f2785d] flex items-center justify-center text-sm font-bold uppercase">
                  @
                </div>
                <div>
                  <h3 className="text-xs font-bold text-[#2a2421] uppercase tracking-wider">
                    Email Stream
                  </h3>
                  <p className="text-[11px] text-[#2a2421]/75 mt-1 uppercase">
                    Submit form to initiate transfer
                  </p>
                </div>
              </div>
            </div>
            
            <div className="retro-card-cyan p-5">
              <div className="flex items-start gap-4 text-[#2a2421]">
                <div className="w-9 h-9 border-2 border-[#2a2421] text-[#7da89f] flex items-center justify-center text-sm font-bold uppercase">
                  T
                </div>
                <div>
                  <h3 className="text-xs font-bold text-[#2a2421] uppercase tracking-wider">
                    Response Window
                  </h3>
                  <p className="text-[11px] text-[#2a2421]/75 mt-1 uppercase">
                    Usually within 24 hours
                  </p>
                </div>
              </div>
            </div>

            <div className="retro-card-pink p-5">
              <div className="flex items-start gap-4 text-[#2a2421]">
                <div className="w-9 h-9 border-2 border-[#2a2421] text-[#ffb09c] flex items-center justify-center text-sm font-bold uppercase">
                  L
                </div>
                <div>
                  <h3 className="text-xs font-bold text-[#2a2421] uppercase tracking-wider">
                    Node Location
                  </h3>
                  <p className="text-[11px] text-[#2a2421]/75 mt-1 uppercase">
                    Remote -- Distributed globally
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Form */}
          <div className="lg:col-span-3">
            <div className="retro-card p-7">
              {submitted ? (
                <div className="text-center py-12">
                  <div className="inline-flex items-center justify-center w-14 h-14 border-2 border-[#2a2421] text-[#7da89f] mb-5 text-2xl bg-[#fdfaf2]">
                    ✓
                  </div>
                  <h2 className="text-lg font-bold text-[#2a2421] uppercase tracking-wider mb-2">
                    Message Sent!
                  </h2>
                  <p className="text-xs text-[#2a2421]/75 mb-6 uppercase">
                    Transmission complete. We will process your ticket.
                  </p>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="text-[#7da89f] font-bold text-xs uppercase hover:underline"
                  >
                    Send another message &rarr;
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label
                        htmlFor="name"
                        className="block text-xs font-bold uppercase tracking-wider text-[#2a2421]/80 mb-1.5"
                      >
                        Name
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="retro-input w-full px-4 py-2.5"
                        placeholder="NAME ID"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="email"
                        className="block text-xs font-bold uppercase tracking-wider text-[#2a2421]/80 mb-1.5"
                      >
                        Email Address
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="retro-input w-full px-4 py-2.5"
                        placeholder="USER@HOST.COM"
                      />
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="subject"
                      className="block text-xs font-bold uppercase tracking-wider text-[#2a2421]/80 mb-1.5"
                    >
                      Subject Parameter
                    </label>
                    <input
                      type="text"
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      required
                      className="retro-input w-full px-4 py-2.5"
                      placeholder="MESSAGE SUBJECT"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="message"
                      className="block text-xs font-bold uppercase tracking-wider text-[#2a2421]/80 mb-1.5"
                    >
                      Message Payload
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows={5}
                      className="retro-input w-full px-4 py-2.5 resize-none"
                      placeholder="TYPE MESSAGE CONTENT HERE..."
                    ></textarea>
                  </div>

                  {isError && (
                    <div className="bg-[#f2785d]/10 border-2 border-[#2a2421] text-[#f2785d] text-xs px-4 py-2.5">
                      [ALERT] {isError}
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={isPending}
                    className="retro-btn-cyan"
                  >
                    {isPending ? "TRANSMITTING..." : "SEND MESSAGE"}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Contact;
