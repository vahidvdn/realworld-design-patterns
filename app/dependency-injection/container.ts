import 'reflect-metadata'

export class Container {
  dependencies = [];

  init(deps: any[]) {
    deps.map((target) => {
      const isInjectable = Reflect.getMetadata('injectable', target);
      if (!isInjectable) return;

      // get the typeof parameters of constructor
      const paramTypes = Reflect.getMetadata('design:paramtypes', target) || [];

      // resolve dependecies of current dependency
      const childrenDep = paramTypes.map((paramType) => {
        // recursively resolve all child dependencies:
        this.init([paramType]);

        if (!this.dependencies[paramType.name]) {
          this.dependencies[paramType.name] = new paramType();
          return this.dependencies[paramType.name];
        }
        return this.dependencies[paramType.name];
      });

      // resolve dependency by injection child classes that already resolved
      if (!this.dependencies[target.name]) {
        this.dependencies[target.name] = new target(...childrenDep);
      }
    });

    return this;
  }

  public get<T extends new (...args: any[]) => any>(
    serviceClass: T,
  ): InstanceType<T> {
    return this.dependencies[serviceClass.name];
  }
}

export function Injectable() {
  return function (target: any) {
    Reflect.defineMetadata('injectable', true, target);
  };
}