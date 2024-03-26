"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
const routes_1 = require("./decorators/routes");
const controller_1 = require("./decorators/controller");
const BodyValidator_1 = require("./decorators/BodyValidator");
let LoginController = class LoginController {
    getLogin(req, res) {
        res.send(`
            <form method="POST">
                <div>
                    <label>Email</label>
                    <input type="text" name="email"/>
                </div>
                <div>
                    <label>Password</label>
                    <input type="password" name="password"/>
                </div>
                <button>Login</button>
            </form>
        `);
    }
    postLogin(req, res) {
        const { email, password } = req.body;
        if (email && password && email === 'baah@mail.com' && password === 'baah') {
            req.session = { loggedIn: true };
            res.redirect('/');
        }
        else {
            res.send('Invalid Email');
        }
    }
    ;
    getLogout(req, res) {
        req.session = undefined;
        res.redirect('/');
    }
};
__decorate([
    (0, routes_1.get)('/login'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], LoginController.prototype, "getLogin", null);
__decorate([
    (0, routes_1.post)('/login'),
    (0, BodyValidator_1.BodyValidator)('email', 'password'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], LoginController.prototype, "postLogin", null);
__decorate([
    (0, routes_1.get)('/logout'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], LoginController.prototype, "getLogout", null);
LoginController = __decorate([
    (0, controller_1.controller)('/auth')
], LoginController);
