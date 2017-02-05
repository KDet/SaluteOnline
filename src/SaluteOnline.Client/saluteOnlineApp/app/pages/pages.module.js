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
var core_1 = require("@angular/core");
var common_1 = require("@angular/common");
var pages_routing_1 = require("./pages.routing");
var pages_component_1 = require("./pages.component");
var so_header_component_1 = require('../components/so-header/so-header.component');
var so_sidebar_component_1 = require("../components/so-sidebar/so-sidebar.component");
var so_menu_component_1 = require("../components/so-menu/so-menu.component");
var so_menuitem_component_1 = require("../components/so-menuitem/so-menuitem.component");
var PagesModule = (function () {
    function PagesModule() {
    }
    PagesModule = __decorate([
        core_1.NgModule({
            imports: [common_1.CommonModule, pages_routing_1.routing],
            declarations: [pages_component_1.Pages, so_header_component_1.SoHeader, so_sidebar_component_1.SoSidebar, so_menu_component_1.SoMenu, so_menuitem_component_1.SoMenuItem]
        }), 
        __metadata('design:paramtypes', [])
    ], PagesModule);
    return PagesModule;
}());
exports.PagesModule = PagesModule;
//# sourceMappingURL=pages.module.js.map