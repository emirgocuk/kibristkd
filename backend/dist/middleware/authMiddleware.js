import jwt from 'jsonwebtoken';
export const protect = (req, res, next) => {
    let token;
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            token = req.headers.authorization.split(' ')[1];
            const decoded = jwt.verify(token, process.env.JWT_SECRET || 'varsayilan_gizli_anahtar');
            req.user = decoded;
            next();
        }
        catch (error) {
            console.error('Token doğrulama hatası', error);
            res.status(401).json({ message: 'Yetkisiz işlem, token geçersiz.' });
        }
    }
    if (!token) {
        res.status(401).json({ message: 'Yetkisiz işlem, token bulunamadı.' });
    }
};
export const authorize = (...roles) => {
    return (req, res, next) => {
        const userRole = req.user?.role;
        if (!userRole || !roles.includes(userRole)) {
            return res.status(403).json({ message: 'Bu işlemi yapmak için yetkiniz yok.' });
        }
        next();
    };
};
