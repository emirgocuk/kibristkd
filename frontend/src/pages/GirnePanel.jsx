import React, { useEffect, useMemo, useState } from "react";
import { useAuth } from "../context/AuthContext";
import http from "../api/http";

// --- İKONLAR (MUI Icons yerine) ---
// Panel için gerekli tüm ikonların basit SVG versiyonları
const MenuIcon = () => <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" /></svg>;
const PostIcon = () => <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>;
const SliderIcon = () => <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>;
const AuthorsIcon = () => <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M15 21a6 6 0 00-9-5.197m0 0A10.999 10.999 0 0012 12c2.67 0 5.117.936 7 2.503" /></svg>;
const AnnounceIcon = () => <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.875 9.168-3.928" /></svg>;
const LogoutIcon = () => <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" /></svg>;
const UploadIcon = () => <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" /></svg>;
const DeleteIcon = () => <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>;
const CrossIcon = () => <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>;

// --- TEKRAR KULLANILABİLİR BİLEŞENLER (MUI yerine) ---

// Bölüm Kartı
const Section = ({ children }) => <div className="mb-6 rounded-lg border border-gray-200 bg-white p-4 shadow-sm">{children}</div>;

// Başlık
const SectionTitle = ({ children }) => <h2 className="mb-2 text-lg font-bold text-gray-800">{children}</h2>;

// Form Girdisi
const Input = ({ label, ...props }) => (
    <div>
        <label className="mb-1 block text-sm font-medium text-gray-700">{label}</label>
        <input {...props} className="w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500" />
    </div>
);

// Metin Alanı
const Textarea = ({ label, ...props }) => (
    <div>
        <label className="mb-1 block text-sm font-medium text-gray-700">{label}</label>
        <textarea {...props} className="w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500" />
    </div>
);

// Seçim Alanı
const Select = ({ label, children, ...props }) => (
     <div>
        <label className="mb-1 block text-sm font-medium text-gray-700">{label}</label>
        <select {...props} className="w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500">
            {children}
        </select>
    </div>
);

// Buton
const Button = ({ children, variant = 'primary', ...props }) => {
    const baseClasses = "px-4 py-2 rounded-md font-semibold text-sm transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2";
    const variants = {
        primary: "bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500",
        secondary: "bg-gray-200 text-gray-800 hover:bg-gray-300 focus:ring-gray-400",
        danger: "bg-red-600 text-white hover:bg-red-700 focus:ring-red-500",
        ghost: "bg-transparent text-gray-600 hover:bg-gray-100 focus:ring-gray-400"
    };
    return <button {...props} className={`${baseClasses} ${variants[variant]}`}>{children}</button>;
};

// Switch
const Switch = ({ label, checked, onChange }) => (
    <label className="flex items-center space-x-2 cursor-pointer">
        <div className="relative">
            <input type="checkbox" className="sr-only" checked={checked} onChange={onChange} />
            <div className={`block h-6 w-10 rounded-full ${checked ? 'bg-blue-600' : 'bg-gray-300'}`}></div>
            <div className={`dot absolute left-1 top-1 h-4 w-4 rounded-full bg-white transition-transform ${checked ? 'translate-x-full' : ''}`}></div>
        </div>
        <span className="text-sm text-gray-700">{label}</span>
    </label>
);

// Bildirim (Toast)
const Toast = ({ msg, type, onClose }) => {
    const colors = {
        success: 'bg-green-500',
        warning: 'bg-yellow-500',
        info: 'bg-blue-500',
        error: 'bg-red-500',
    };
    return (
        <div className={`fixed bottom-5 right-5 flex items-center rounded-md px-4 py-3 text-white shadow-lg ${colors[type]}`}>
            <span>{msg}</span>
            <button onClick={onClose} className="ml-4"><CrossIcon /></button>
        </div>
    );
};

// ... (Diğer state ve fonksiyon tanımlamaları aynı kalacak)

// ANA PANEL BİLEŞENİ
export default function GirnePanel() {
    // ... (tüm state'ler, loader'lar ve action fonksiyonları buraya gelecek, önceki kodla aynı)
    const { user, logout } = useAuth?.() || { user: null, logout: null };
    const [menuOpen, setMenuOpen] = useState(false);
    const [section, setSection] = useState("posts");
    const [toast, setToast] = useState({ open: false, msg: "", type: "success" });
    // ... diğer tüm state'ler

    // ... (tüm veri yükleme ve CRUD fonksiyonları)

    // Sol Menü (Drawer) İçeriği
    const drawerContent = (
        <div className="flex h-full flex-col bg-white">
            <nav className="flex-grow overflow-y-auto">
                {/* ... menü elemanları ... */}
            </nav>
            <div className="border-t p-2">
                 {/* ... Hoş geldiniz ve çıkış butonu ... */}
            </div>
        </div>
    );

    return (
        <div className="flex min-h-screen bg-gray-50">
            {/* Üst Bar (AppBar) */}
            <header className="fixed z-30 flex h-16 w-full items-center justify-between bg-red-600 px-4 text-white shadow">
                {/* ... AppBar içeriği ... */}
            </header>

            {/* Sol Menü (Drawer) */}
            {/* Masaüstü için sabit menü */}
            <aside className="fixed left-0 top-16 hidden h-[calc(100vh-4rem)] w-64 border-r bg-white md:block">
                {drawerContent}
            </aside>
            {/* Mobil için açılır menü */}
            {menuOpen && (
                 <div className="fixed inset-0 z-40 md:hidden">
                    <div className="absolute inset-0 bg-black/30" onClick={() => setMenuOpen(false)}></div>
                    <aside className="relative h-full w-64 bg-white">
                        {drawerContent}
                    </aside>
                </div>
            )}
            
            {/* Ana İçerik Alanı */}
            <main className="flex-grow p-4 pt-20 md:ml-64">
                <div className="mx-auto max-w-screen-lg">
                    {section === "posts" && (
                        <div>
                           <Section>
                               <SectionTitle>Yeni Makale</SectionTitle>
                               <form onSubmit={createPost} className="space-y-4">
                                   <Input label="Başlık" value={pTitle} onChange={(e)=>setPTitle(e.target.value)} required />
                                   {/* ... diğer form elemanları ... */}
                                   <div className="flex justify-end space-x-2">
                                       <Button type="button" variant="secondary" onClick={() => { /* ... */ }}>Temizle</Button>
                                       <Button type="submit">Kaydet</Button>
                                   </div>
                               </form>
                           </Section>
                           <Section>
                               {/* ... Makale listeleri ... */}
                           </Section>
                        </div>
                    )}
                    {/* ... diğer section'lar için benzer yapılar ... */}
                </div>
            </main>

            {/* Bildirim (Toast) */}
            {toast.open && (
                <Toast 
                    msg={toast.msg} 
                    type={toast.type} 
                    onClose={() => setToast(p => ({ ...p, open: false }))} 
                />
            )}
        </div>
    );
}