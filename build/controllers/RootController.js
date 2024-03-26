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
require("reflect-metadata");
const routes_1 = require("./decorators/routes");
const controller_1 = require("./decorators/controller");
const Use_1 = require("./decorators/Use");
const requireAuth = (req, res, next) => {
    if (req.session && req.session.loggedIn) {
        next();
        return;
    }
    res.status(403).send(`
        <div>
            <h1>Not permitted, Please login before</h1>
            <a href='/auth/login'>login</a>
        </div>
    `);
};
let RootController = class RootController {
    getRoot(req, res) {
        if (req.session && req.session.loggedIn) {
            res.send(`
                <div>
                    <h1>You are logged in</h1>
                    <a href='/auth/logout'>Logout</a>
                    <a href='/protected'>Danger</a>
                </div>
            `);
        }
        else {
            res.send(`
                <div>
                    <h1>You are not logged in</h1>
                    <a href='/auth/login'>Login</a>
                </div>
            `);
        }
    }
    getProtected(req, res) {
        res.send('Welcome to protected route, logged in user');
    }
};
__decorate([
    (0, routes_1.get)('/'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], RootController.prototype, "getRoot", null);
__decorate([
    (0, routes_1.get)('/protected'),
    (0, Use_1.use)(requireAuth),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], RootController.prototype, "getProtected", null);
RootController = __decorate([
    (0, controller_1.controller)('')
], RootController);
