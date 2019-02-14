import { ApplicationRef, ComponentFactoryResolver, ComponentRef, Injectable, Injector, EmbeddedViewRef, Type, ComponentFactory } from '@angular/core';

/**
 * Service allowing to inject specified component into selected container,
 * correctly handling inputs and changes detection.
 * Honestly stolen from SO and adapted to our needs.
 */
@Injectable()
export class InjectionService {
    // container for injecting
    private container: ComponentRef<any>;

    constructor (
        private readonly applicationRef: ApplicationRef,
        private readonly resolver: ComponentFactoryResolver,
        private readonly injector: Injector,
    ) { }

    /**
     * Get root view container (usually is application root component,
     * but it may be different).
     */
    private getRootViewContainer () : ComponentRef<any> {
        return this.container || this.applicationRef.components[0];
    }

    /**
     * Set default root view container manually
     * (may be useful when there are no root components - for example, with ngUpgrade).
     */
    public setRootViewContainer (container: ComponentRef<any>) : void {
        this.container = container;
    }

    /**
     * Get root node of specified component as HTML element.
     */
    private static getComponentRootNode (componentRef: ComponentRef<any>) : HTMLElement {
        const hostEmbeddedView: EmbeddedViewRef<any> =
            componentRef.hostView as EmbeddedViewRef<any>;

        return hostEmbeddedView.rootNodes[0] as HTMLElement;
    }

    /**
     * Map specified options to component's inputs.
     */
    private static projectComponentInputs (
        component: ComponentRef<any>,
        options?: any,
    ): void {
        if (!options) { return; }

        for (const key in options) {
            if (options.hasOwnProperty(key)) {
                component.instance[key] = options[key];
            }
        }
    }

    /**
     * Inject component into specific location (or root).
     * Returns reference to constructed component.
     */
    public appendComponent<T> (
        componentClass: Type<T>,
        options?: any,
        location?: HTMLElement,
    ): ComponentRef<any> {
        // we'll inject component into root view container if
        // location weren't specified
        const rootContainer: HTMLElement = InjectionService.getComponentRootNode(
            this.getRootViewContainer(),
        );
        const targetContainer: HTMLElement = location || rootContainer;

        // constructing component instance
        const componentFactory: ComponentFactory<T>
            = this.resolver.resolveComponentFactory(componentClass);
        const componentRef: ComponentRef<T>
            = componentFactory.create(this.injector);
        const componentRootNode: HTMLElement
            = InjectionService.getComponentRootNode(componentRef);

        // mapping options to component's inputs
        InjectionService.projectComponentInputs(componentRef, options);

        // attaching component to application
        // (detaching also has to be handled manually)
        this.applicationRef.attachView(componentRef.hostView);
        componentRef.onDestroy(() => {
            this.applicationRef.detachView(componentRef.hostView);
        });

        // inserting actual template
        targetContainer.appendChild(componentRootNode);

        return componentRef;
    }
}
