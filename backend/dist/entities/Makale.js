var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, CreateDateColumn, UpdateDateColumn, RelationId } from "typeorm";
import { User } from "./User.js";
let Makale = class Makale {
    id;
    baslik;
    icerik;
    // URL için otomatik dolduracağız, benzersiz
    slug;
    kategori;
    kapakResmi; // URL alanı istersek dursun
    // BLOB depolama (kapak görseli)
    kapakResmiBlob;
    kapakResmiMime;
    status;
    createdBy;
    createdById;
    createdAt;
    updatedAt;
};
__decorate([
    PrimaryGeneratedColumn(),
    __metadata("design:type", Number)
], Makale.prototype, "id", void 0);
__decorate([
    Column({ type: "varchar", length: 255 }),
    __metadata("design:type", String)
], Makale.prototype, "baslik", void 0);
__decorate([
    Column({ type: "longtext" }),
    __metadata("design:type", String)
], Makale.prototype, "icerik", void 0);
__decorate([
    Column({ type: "varchar", length: 255, unique: true }),
    __metadata("design:type", String)
], Makale.prototype, "slug", void 0);
__decorate([
    Column({ type: "varchar", length: 191, nullable: true, default: null }),
    __metadata("design:type", Object)
], Makale.prototype, "kategori", void 0);
__decorate([
    Column({ type: "varchar", length: 1024, nullable: true, default: null }),
    __metadata("design:type", Object)
], Makale.prototype, "kapakResmi", void 0);
__decorate([
    Column({ type: "longblob", nullable: true, select: false }),
    __metadata("design:type", Object)
], Makale.prototype, "kapakResmiBlob", void 0);
__decorate([
    Column({ type: "varchar", length: 128, nullable: true, default: null }),
    __metadata("design:type", Object)
], Makale.prototype, "kapakResmiMime", void 0);
__decorate([
    Column({ type: "enum", enum: ["draft", "pending", "published"], default: "pending" }),
    __metadata("design:type", String)
], Makale.prototype, "status", void 0);
__decorate([
    ManyToOne(() => User, { eager: true, onDelete: "SET NULL" }),
    JoinColumn({ name: "createdById" }),
    __metadata("design:type", Object)
], Makale.prototype, "createdBy", void 0);
__decorate([
    RelationId((m) => m.createdBy),
    __metadata("design:type", Object)
], Makale.prototype, "createdById", void 0);
__decorate([
    CreateDateColumn(),
    __metadata("design:type", Date)
], Makale.prototype, "createdAt", void 0);
__decorate([
    UpdateDateColumn(),
    __metadata("design:type", Date)
], Makale.prototype, "updatedAt", void 0);
Makale = __decorate([
    Entity()
], Makale);
export { Makale };
//# sourceMappingURL=Makale.js.map