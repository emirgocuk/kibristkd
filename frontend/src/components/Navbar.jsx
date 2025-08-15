import React, { useState, useRef, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import logo from '../photos/logo.png';

// --- İkonlar ---
const MenuIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" /></svg>
);
const ArrowDownIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="ml-1 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
);
const SearchIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
);

// Menü verileri (değişiklik yok)
const mainNavItems = [
    // ... (menü verileriniz buraya gelecek, önceki kodla aynı)
    {
        text: "Kurumsal",
        path: "/kurumsal",
        subItems: [
            {text: "Tarihçe", path: "/kurumsal/tarihce"},
            {text: "Tüzük", path: "/kurumsal/tuzuk"},
        ]
    },
    { text: "Yayınlarımız", path: "/yayinlarimiz" },
    // ... diğer menü elemanları
];


// --- Mobil Menü İçin Alt Menü ---
function MobileSubMenu({ item, closeMobileMenu }) {
    const [isOpen, setIsOpen] = useState(false);
    return (
        <>
            <button onClick={() => setIsOpen(!isOpen)} className="flex w-full items-center justify-between px-4 py-2 text-left text-gray-700">
                <span>{item.text}</span>
                <ArrowDownIcon />
            </button>
            {isOpen && (
                <div className="pl-4">
                    {item.subItems.map(subItem => (
                        <Link key={subItem.text} to={subItem.path} onClick={closeMobileMenu} className="block px-4 py-2 text-sm text-gray-600 hover:bg-gray-100">
                            {subItem.text}
                        </Link>
                    ))}
                </div>
            )}
        </>
    );
}

// --- Ana Navbar Bileşeni ---
export default function Navbar() {
    const location = useLocation();
    const [mobileOpen, setMobileOpen] = useState(false);
    const [openDropdown, setOpenDropdown] = useState(null);
    const timeoutRef = useRef(null);

    const handleMouseEnter = (menuText) => {
        clearTimeout(timeoutRef.current);
        setOpenDropdown(menuText);
    };

    const handleMouseLeave = () => {
        timeoutRef.current = setTimeout(() => {
            setOpenDropdown(null);
        }, 200); // 200ms bekleme süresi
    };
    
    // Sayfa değiştiğinde mobil menüyü kapat
    useEffect(() => {
        setMobileOpen(false);
    }, [location.pathname]);

    // Aktif link stilini belirleyen fonksiyon
    const getLinkClassName = (path, hasSubItems = false) => {
        const isActive = location.pathname.startsWith(path);
        const baseClasses = `relative flex items-center whitespace-nowrap px-3 py-4 text-sm font-medium transition-colors duration-300 ease-out after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-full after:bg-blue-600 after:transition-transform after:duration-300 after:ease-out`;
        
        if (isActive) {
            return `${baseClasses} text-blue-600 after:scale-x-100`;
        }
        return `${baseClasses} text-gray-700 hover:text-blue-600 after:scale-x-0 hover:after:scale-x-100`;
    };


    return (
        <header className="sticky top-0 z-50 w-full border-b border-gray-200 bg-white shadow-sm">
            <div className="container mx-auto max-w-screen-xl px-4">
                <div className="flex items-center justify-between">
                    {/* Logo */}
                    <Link to="/" className="flex-shrink-0 py-2">
                        <img src={logo} alt="Logo" className="h-10" />
                    </Link>

                    {/* Masaüstü Navigasyon */}
                    <nav className="hidden items-center justify-center lg:flex">
                        {mainNavItems.map(item => (
                            <div key={item.text} className="relative" onMouseLeave={handleMouseLeave}>
                                <Link
                                    to={item.path}
                                    className={getLinkClassName(item.path, !!item.subItems)}
                                    onMouseEnter={() => item.subItems && handleMouseEnter(item.text)}
                                >
                                    {item.text}
                                    {item.subItems && <ArrowDownIcon />}
                                </Link>
                                
                                {item.subItems && openDropdown === item.text && (
                                    <div 
                                        className="absolute left-0 top-full mt-1 w-56 origin-top-left rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5"
                                        onMouseEnter={() => handleMouseEnter(item.text)} // menü üzerinde kalındığında kapanmasını engelle
                                    >
                                        <div className="py-1">
                                            {item.subItems.map(subItem => (
                                                <Link key={subItem.text} to={subItem.path} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                                                    {subItem.text}
                                                </Link>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>
                        ))}
                        {/* Arama Kutusu */}
                        <div className="relative ml-4 flex items-center py-4 after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-full after:bg-blue-600">
                           <SearchIcon />
                           <input type="text" placeholder="Ara..." className="w-16 rounded py-1 pl-2 text-sm transition-all duration-300 focus:w-32 focus:outline-none" />
                        </div>
                    </nav>

                    {/* Mobil Menü Butonu */}
                    <div className="lg:hidden">
                        <button onClick={() => setMobileOpen(!mobileOpen)} className="p-2 text-gray-700">
                            <MenuIcon />
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobil Menü (Drawer) */}
            {mobileOpen && (
                <div className="fixed inset-0 z-40 lg:hidden">
                    {/* Arka plan karartma */}
                    <div className="absolute inset-0 bg-black opacity-25" onClick={() => setMobileOpen(false)}></div>
                    {/* Menü içeriği */}
                    <div className="relative h-full w-64 max-w-[calc(100%-3rem)] bg-white shadow-xl">
                       <nav className="pt-8">
                           {mainNavItems.map(item => (
                               item.subItems ? (
                                   <MobileSubMenu key={item.text} item={item} closeMobileMenu={() => setMobileOpen(false)} />
                               ) : (
                                   <Link key={item.text} to={item.path} className="block px-4 py-2 text-gray-700 hover:bg-gray-100">
                                       {item.text}
                                   </Link>
                               )
                           ))}
                       </nav>
                    </div>
                </div>
            )}
        </header>
    );
}