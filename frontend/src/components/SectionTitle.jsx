import React from 'react';

const SectionTitle = ({ children }) => (
  // Box -> div
  // mb: 4 (32px) -> mb-8 (2rem)
  <div className="mb-8">
    {/* Typography -> h2 */}
    {/* variant="h4" -> text-3xl */}
    {/* fontWeight: 'bold' -> font-bold */}
    <h2 className="text-3xl font-bold text-gray-800">
      {children}
    </h2>
    {/* Box (underline) -> div */}
    {/* height: '3px' -> h-1 */}
    {/* width: '60px' -> w-16 */}
    {/* backgroundColor: 'secondary.main' -> bg-blue-600 (veya tema renginiz ne ise) */}
    {/* mt: 1 (8px) -> mt-2 */}
    <div className="mt-2 h-1 w-16 bg-blue-600" />
  </div>
);

export default SectionTitle;