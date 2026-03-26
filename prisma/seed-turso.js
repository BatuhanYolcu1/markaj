"use strict";
/**
 * Turso uzak veritabanını seed'lemek için script.
 *
 * Kullanım:
 *   set TURSO_DATABASE_URL=libsql://...
 *   set TURSO_AUTH_TOKEN=eyJ...
 *   npx tsx prisma/seed-turso.ts
 */
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var client_1 = require("@prisma/client");
var adapter_libsql_1 = require("@prisma/adapter-libsql");
var products_1 = require("../src/data/products");
var tursoUrl = process.env.TURSO_DATABASE_URL;
var tursoToken = process.env.TURSO_AUTH_TOKEN;
if (!tursoUrl || !tursoToken) {
    console.error('❌ TURSO_DATABASE_URL ve TURSO_AUTH_TOKEN env değişkenleri gerekli!');
    console.error('   set TURSO_DATABASE_URL=libsql://...');
    console.error('   set TURSO_AUTH_TOKEN=eyJ...');
    process.exit(1);
}
var adapter = new adapter_libsql_1.PrismaLibSQL({ url: tursoUrl, authToken: tursoToken });
var prisma = new client_1.PrismaClient({ adapter: adapter });
function main() {
    return __awaiter(this, void 0, void 0, function () {
        var _i, products_2, product, existing;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    console.log('🚀 Turso veritabanı seed ediliyor...\n');
                    // Promo code
                    return [4 /*yield*/, prisma.promoCode.upsert({
                            where: { code: 'STREET20' },
                            update: {},
                            create: {
                                code: 'STREET20',
                                discount: 0.20,
                                isActive: true,
                            },
                        })];
                case 1:
                    // Promo code
                    _a.sent();
                    console.log('✅ Promo kodu: STREET20');
                    _i = 0, products_2 = products_1.products;
                    _a.label = 2;
                case 2:
                    if (!(_i < products_2.length)) return [3 /*break*/, 7];
                    product = products_2[_i];
                    return [4 /*yield*/, prisma.product.findFirst({
                            where: { name: product.name }
                        })];
                case 3:
                    existing = _a.sent();
                    if (!!existing) return [3 /*break*/, 5];
                    return [4 /*yield*/, prisma.product.create({
                            data: {
                                name: product.name,
                                category: product.category,
                                subCategory: product.subCategory,
                                fit: product.fit,
                                price: product.price,
                                originalPrice: product.originalPrice,
                                description: product.description,
                                details: JSON.stringify(product.details),
                                images: JSON.stringify(product.images),
                                isNew: product.isNew || false,
                                stock: {
                                    create: {
                                        S: product.stock.S,
                                        M: product.stock.M,
                                        L: product.stock.L,
                                        XL: product.stock.XL,
                                        XXL: product.stock.XXL,
                                    }
                                }
                            }
                        })];
                case 4:
                    _a.sent();
                    console.log("\u2705 \u00DCr\u00FCn eklendi: ".concat(product.name));
                    return [3 /*break*/, 6];
                case 5:
                    console.log("\u23ED\uFE0F  Zaten mevcut: ".concat(product.name));
                    _a.label = 6;
                case 6:
                    _i++;
                    return [3 /*break*/, 2];
                case 7:
                    console.log('\n🎉 Turso veritabanı başarıyla seed edildi!');
                    return [2 /*return*/];
            }
        });
    });
}
main()
    .catch(function (e) {
    console.error('❌ Hata:', e);
    process.exit(1);
})
    .finally(function () { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, prisma.$disconnect()];
            case 1:
                _a.sent();
                return [2 /*return*/];
        }
    });
}); });
