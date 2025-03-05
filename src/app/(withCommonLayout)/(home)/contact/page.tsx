import Banner from "@/components/shared/banner";
import PrimaryButton from "@/components/shared/PrimaryButton";
import Image from "next/image";

export default function ContactPage() {
  return (
    <div className="bg-gray-50">
      <Banner title="contact" path="Home - Contact" />

      <main className="container mx-auto px-4 py-10">
        {/* Contact Info Section */}
        <section className="grid lg:grid-cols-2 gap-8 items-center mb-16">
          <div>
            <h2 className="text-xl font-semibold text-blue-600 mb-2">
              CONTACT
            </h2>
            <h3 className="text-4xl font-bold text-gray-800 mb-4">
              Media and Business Inquiries
            </h3>
            <p className="text-gray-600 leading-relaxed mb-6">
              Sagittis quisque ligula vitae dignissim vel nunc urna urna. Morbi
              luctus purus vitae neque vitae pellentesque ultrices. Imperdiet at
              pellentesque vitae aliquet tempor eget rutrum tellus.
            </p>
            <div className="flex items-center gap-4 mb-4">
              <Image
                src="/images/logo.png"
                alt="Company Logo"
                width={50}
                height={50}
                className="rounded-full"
              />
              <div>
                <p className="text-gray-800 font-bold">Skooli</p>
                <p className="text-gray-600">info@Skooli.com</p>
                <p className="text-gray-600">021-3456-789</p>
              </div>
            </div>
            <div className="flex gap-4 text-blue-600">
              <a href="#" className="hover:text-blue-800 transition">
                <i className="fab fa-facebook-f"></i>
              </a>
              <a href="#" className="hover:text-blue-800 transition">
                <i className="fab fa-twitter"></i>
              </a>
              <a href="#" className="hover:text-blue-800 transition">
                <i className="fab fa-instagram"></i>
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-xl font-semibold text-gray-800 mb-4">
              Send us an inquiry below or email us at info@Skooli.com
            </h3>
            <form className="bg-white shadow-md rounded-lg p-6 space-y-4">
              <input
                type="text"
                placeholder="Name"
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-600"
              />
              <input
                type="email"
                placeholder="Email"
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-600"
              />
              <input
                type="text"
                placeholder="Phone"
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-600"
              />
              <textarea
                placeholder="Message"
                rows={4}
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-600"
              ></textarea>
              <PrimaryButton className="w-full">SEND MESSAGE</PrimaryButton>
            </form>
          </div>
        </section>
      </main>
    </div>
  );
}
