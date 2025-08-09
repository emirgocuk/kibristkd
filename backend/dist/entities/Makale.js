var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from "typeorm";
let Makale = class Makale {
};
__decorate([
    PrimaryGeneratedColumn(),
    __metadata("design:type", Number)
], Makale.prototype, "id", void 0);
__decorate([
    Column({ length: 255 }),
    __metadata("design:type", String)
], Makale.prototype, "baslik", void 0);
__decorate([
    Column("text"),
    __metadata("design:type", String)
], Makale.prototype, "icerik", void 0);
__decorate([
    Column({ length: 100 }),
    __metadata("design:type", String)
], Makale.prototype, "kategori", void 0);
__decorate([
    Column({ type: "datetime" }),
    __metadata("design:type", Date)
], Makale.prototype, "tarih", void 0);
__decorate([
    Column({ nullable: true }),
    __metadata("design:type", String)
], Makale.prototype, "kapakResmi", void 0);
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
