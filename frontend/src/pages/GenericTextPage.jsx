import React from 'react';

// Bu component, başlık ve içerik metni alarak basit bir sayfa oluşturur.
// Eğer content prop'u sağlanmazsa, varsayılan olarak Lorem Ipsum metni gösterir.
function GenericTextPage({ title, content }) {
  // Varsayılan içerik - stiller Tailwind sınıfları ile güncellendi
  const defaultContent = (
    <>
      <p className="mb-6 text-lg leading-relaxed text-gray-700">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex,
        sit amet blandit leo lobortis eget. Lorem ipsum dolor sit amet, consectetur adipiscing
        elit. Suspendisse malesuada lacus ex, sit amet blandit leo lobortis eget. Nulla
        facilisi. Phasellus sollicitudin nulla et quam mattis feugiat. Aliquam eget
        maximus est, id dignissim quam.
      </p>
      <p className="mb-6 text-lg leading-relaxed text-gray-700">
        Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis
        egestas. Vestibulum tortor quam, feugiat vitae, ultricies eget, tempor sit amet,
        ante. Donec eu libero sit amet quam egestas semper. Aenean ultricies mi vitae est.
        Mauris placerat eleifend leo. Quisque sit amet est et sapien ullamcorper pharetra.
        Vestibulum erat wisi, condimentum sed, commodo vitae, ornare sit amet, wisi.
      </p>
      <p className="mb-6 text-lg leading-relaxed text-gray-700">
        Aenean fermentum, elit eget tincidunt condimentum, eros ipsum rutrum orci, sagittis
        tempus lacus enim ac dui. Donec non enim in turpis pulvinar facilisis. Ut felis.
        Praesent dapibus, neque id cursus faucibus, tortor neque egestas augue, eu vulputate
        magna eros eu erat. Aliquam erat volutpat. Nam dui mi, tincidunt quis, accumsan
        porttitor, facilisis luctus, metus.
      </p>
    </>
  );

  return (
    // Container -> div + container sınıfları
    <div className="container mx-auto max-w-4xl px-4 py-16">
      {/* Paper -> div + border/shadow sınıfları */}
      <div className="rounded-lg border border-gray-200 p-6 shadow-sm md:p-10">
        {/* Typography (Başlık) -> h1 */}
        <h1 className="mb-6 text-4xl font-bold text-gray-900">
          {title}
        </h1>
        {/* Box -> div */}
        <div>
          {content || defaultContent}
        </div>
      </div>
    </div>
  );
}

export default GenericTextPage;