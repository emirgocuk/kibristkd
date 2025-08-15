import React from 'react';

// --- İkonlar (MUI Icons yerine) ---
const LocationOnIcon = () => (
    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
);
const PhoneIcon = () => (
    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
);
const EmailIcon = () => (
    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
);

// Form girdileri için yeniden kullanılabilir bileşen
const FormInput = ({ label, ...props }) => (
    <div>
        <label htmlFor={props.id} className="mb-1 block text-sm font-medium text-gray-700">{label}</label>
        <input {...props} className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500" />
    </div>
);

const FormTextarea = ({ label, ...props }) => (
     <div>
        <label htmlFor={props.id} className="mb-1 block text-sm font-medium text-gray-700">{label}</label>
        <textarea {...props} className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500" />
    </div>
)


function IletisimPage() {
  return (
    <div className="container mx-auto px-4 py-16">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-900">Bize Ulaşın</h1>
        <p className="mx-auto mt-2 max-w-2xl text-lg text-gray-600">
          Görüş, öneri ve sorularınız için bizimle iletişime geçebilirsiniz.
        </p>
      </div>

      <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-12">
        {/* İletişim Bilgileri */}
        <div className="md:col-span-5">
          <div className="h-full rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
            <h2 className="mb-4 text-xl font-semibold">İletişim Bilgileri</h2>
            <div className="space-y-4">
              <div className="flex items-start">
                <div className="flex-shrink-0 text-blue-600"><LocationOnIcon /></div>
                <p className="ml-3 text-gray-700">Halk Sokak No:17/2 Yenişehir Çankaya Ankara</p>
              </div>
              <div className="flex items-center">
                <div className="flex-shrink-0 text-blue-600"><PhoneIcon /></div>
                <p className="ml-3 text-gray-700">0 (312) 434 14 12</p>
              </div>
              <div className="flex items-center">
                <div className="flex-shrink-0 text-blue-600"><EmailIcon /></div>
                <p className="ml-3 text-gray-700">info@kibristkd.org.tr</p>
              </div>
            </div>
          </div>
        </div>

        {/* İletişim Formu */}
        <div className="md:col-span-7">
          <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
            <h2 className="mb-4 text-xl font-semibold">Mesaj Gönderin</h2>
            <form noValidate autoComplete="off" className="space-y-4">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <FormInput id="name" label="Adınız Soyadınız" type="text" required />
                <FormInput id="email" label="E-posta Adresiniz" type="email" required />
              </div>
              <FormInput id="subject" label="Konu" type="text" required />
              <FormTextarea id="message" label="Mesajınız" required rows={6} />
              <div>
                <button type="submit" className="rounded-md bg-blue-600 px-6 py-3 text-lg font-semibold text-white shadow-sm transition-colors hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
                  Gönder
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default IletisimPage;