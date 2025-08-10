import { useForm } from "react-hook-form";

const Contact = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isSubmitSuccessful },
  } = useForm();

  const onSubmit = async (data) => {
    console.log("Form data:", data);
    // Here you can send data to your backend API
    // await fetch("/api/contact", { method: "POST", body: JSON.stringify(data) });
  };

  return (
    <div className="flex flex-col lg:flex-row gap-10 pt-10 border-t border-gray-200 px-4 sm:px-8">
      {/* Left - Info Section */}
      <div className="lg:w-1/2 space-y-6">
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight">
          Get in Touch
        </h1>
        <p className="text-gray-600 leading-relaxed">
          Have questions or feedback? We’d love to hear from you. Use the form
          or reach out directly.
        </p>

        <div className="space-y-3 text-gray-700">
          <p>
            <strong>Email:</strong> support@oakdresses.com
          </p>
          <p>
            <strong>Phone:</strong> +234 123 456 789
          </p>
          <p>
            <strong>Address:</strong> Lagos, Nigeria
          </p>
        </div>
      </div>

      {/* Right - Contact Form */}
      <div className="lg:w-1/2 bg-gray-50 p-6 rounded-lg shadow-sm border border-gray-200">
        {isSubmitSuccessful ? (
          <div className="text-green-600 font-medium text-center py-10">
            ✅ Message sent successfully! We’ll get back to you shortly.
          </div>
        ) : (
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-4"
          >
            <div>
              <input
                {...register("name", { required: "Name is required" })}
                placeholder="Your Name"
                className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:border-black transition"
              />
              {errors.name && (
                <p className="text-red-500 text-sm">{errors.name.message}</p>
              )}
            </div>

            <div>
              <input
                type="email"
                {...register("email", { required: "Email is required" })}
                placeholder="Your Email"
                className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:border-black transition"
              />
              {errors.email && (
                <p className="text-red-500 text-sm">{errors.email.message}</p>
              )}
            </div>

            <div>
              <input
                {...register("subject", { required: "Subject is required" })}
                placeholder="Subject"
                className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:border-black transition"
              />
              {errors.subject && (
                <p className="text-red-500 text-sm">{errors.subject.message}</p>
              )}
            </div>

            <div>
              <textarea
                {...register("message", {
                  required: "Message cannot be empty",
                })}
                placeholder="Your Message"
                rows={5}
                className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:border-black transition resize-none"
              />
              {errors.message && (
                <p className="text-red-500 text-sm">{errors.message.message}</p>
              )}
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3 bg-black text-white font-medium rounded hover:bg-gray-800 transition"
            >
              {isSubmitting ? "Sending..." : "Send Message"}
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default Contact;
