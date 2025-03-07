export default class Helper {
  static throttle(fn, threshhold = 250, scope?) {
    let last;
    let deferTimer;

    return function () {
      const context = scope || this;

      const now = +new Date();
      const args = arguments;

      if (last && now < last + threshhold) {
        // hold on to it
        clearTimeout(deferTimer);
        deferTimer = setTimeout(function () {
          last = now;
          fn.apply(context, args);
        }, threshhold);
      } else {
        last = now;
        fn.apply(context, args);
      }
    };
  }

  static round(n: number, round: number = 1): number {
    return Math.round(n * round) / round;
  }
}
