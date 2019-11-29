import store from './index';

/*
* decorator
* @State(state)
*/
export function State(state: string): (target: any, prop: string) => any {
  return (target: any, prop: string): any => {
    Object.defineProperty(target, prop, {
      get() {
        return (store.getState() as any).get(state);
      }
    });
  };
}
