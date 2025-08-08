import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { UserRole } from '../entities/user.js';

export const protect = (req: Request, res: Response, next: NextFunction) => {
    let token;

    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            token = req.headers.authorization.split(' ')[1];
            const decoded = jwt.verify(token, process.env.JWT_SECRET || 'varsayilan_gizli_anahtar') as { id: number, role: UserRole };
            (req as any).user = decoded;
            next();
        } catch (error) {
            console.error('Token doğrulama hatası', error);
            res.status(401).json({ message: 'Yetkisiz işlem, token geçersiz.' });
        }
    }

    if (!token) {
        res.status(401).json({ message: 'Yetkisiz işlem, token bulunamadı.' });
    }
};

export const authorize = (...roles: UserRole[]) => {
    return (req: Request, res: Response, next: NextFunction) => {
        const userRole = (req as any).user?.role;
        if (!userRole || !roles.includes(userRole)) {
            return res.status(403).json({ message: 'Bu işlemi yapmak için yetkiniz yok.' });
        }
        next();
    };
};
