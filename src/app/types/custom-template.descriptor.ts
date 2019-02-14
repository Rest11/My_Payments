import { NgModuleFactory } from '@angular/core/src/linker/ng_module_factory';
import { NgModule, Type } from '@angular/core';
import { CommonComponent } from "../classes/common-component";

export interface CustomTemplateDescriptor {
    component: Type<CommonComponent>;
    module: NgModuleFactory<NgModule>;
}
