var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne } from "typeorm";
import { User } from "./user.js";
export var MakaleStatus;
(function (MakaleStatus) {
    MakaleStatus["PENDING"] = "pending";
    MakaleStatus["APPROVED"] = "approved";
    MakaleStatus["REJECTED"] = "rejected";
})(MakaleStatus || (MakaleStatus = {}));
let Makale = class Makale {
};
__decorate([
    PrimaryGeneratedColumn(),
    __metadata("design:type", Number)
], Makale.prototype, "id", void 0);
__decorate([
    Column(),
    __metadata("design:type", String)
], Makale.prototype, "title", void 0);
__decorate([
    Column(),
    __metadata("design:type", String)
], Makale.prototype, "content", void 0);
__decorate([
    Column({
        type: "enum",
        enum: MakaleStatus,
        default: MakaleStatus.PENDING
    }),
    __metadata("design:type", String)
], Makale.prototype, "status", void 0);
__decorate([
    ManyToOne('User', (user) => user.makaleler),
    __metadata("design:type", User)
], Makale.prototype, "author", void 0);
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
