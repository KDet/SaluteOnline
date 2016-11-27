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
var Subject_1 = require("rxjs/Subject");
var GlobalState = (function () {
    function GlobalState() {
        var _this = this;
        this.data = new Subject_1.Subject();
        this.dataStream = this.data.asObservable();
        this.subscriptions = new Map();
        this.dataStream.subscribe(function (data) { _this.onEvent(data); });
    }
    GlobalState.prototype.notifyDataChanged = function (event, value) {
        var current = this.data[event];
        if (current !== value) {
            this.data[event] = value;
            this.data.next({
                event: event,
                data: this.data[event]
            });
        }
    };
    GlobalState.prototype.subscribe = function (event, callback) {
        var subscribers = this.subscriptions.get(event) || [];
        subscribers.push(callback);
        this.subscriptions.set(event, subscribers);
    };
    GlobalState.prototype.onEvent = function (data) {
        var subscribers = this.subscriptions.get(data['event']) || [];
        subscribers.forEach(function (callback) {
            callback.call(null, data['data']);
        });
    };
    GlobalState = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [])
    ], GlobalState);
    return GlobalState;
}());
exports.GlobalState = GlobalState;
//# sourceMappingURL=global.state.js.map