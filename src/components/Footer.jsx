import { useTranslation } from 'react-i18next';

export default function Footer() {
  const { t } = useTranslation();

  return (
    <div className="bg-gray-900">
      <div className="container px-4 py-12 mx-auto text-white">
        <div className="text-center">
          <h1 className="mb-8 text-4xl font-bold">{t("How can we help you? Get in touch")}</h1>
          <p className="max-w-lg mx-auto mb-8 text-gray-400">
            {t("NAFITH develops and operates technology-driven services that increase the productivity of trade processes and shared freight transportation infrastructure to benefit the public and advance commerce.")}
          </p>
          <a href="https://www.nafith.com/" className="inline-block px-10 py-3 font-semibold text-center transition duration-300 bg-red-500 rounded-lg shadow-lg hover:bg-red-600">{t("Contact Us")}</a>
        </div>
        <div className="flex flex-col items-center justify-center mt-16 md:flex-row">
          <div className="flex flex-wrap justify-center md:justify-start">
            <a href="https://www.nafith.com/" className="mr-6 text-gray-600 uppercase hover:text-white">{t("About")}</a>
            <a href="https://www.nafith.com/" className="mr-6 text-gray-600 uppercase hover:text-white">{t("Services")}</a>
            <a href="https://www.nafith.com/" className="mr-6 text-gray-600 uppercase hover:text-white">{t("Why Us")}</a>
            <a href="https://www.nafith.com/" className="mr-6 text-gray-600 uppercase hover:text-white">{t("Contact")}</a>
          </div>
        </div>
      </div>
    </div>
  );
}
