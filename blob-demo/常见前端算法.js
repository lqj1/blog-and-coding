/**
 * 1. 手写Promise
 * 注意：
 *    1. Promise要暴露then/catch方法
 *    2. Promise构造函数接收一个立即执行的函数callback
 *    3. then/catch只负责把回调放入数组即可
 *    4. resolve/reject负责执行
 *    5. resolve/reject 需要添加宏任务（setTimeout）
 */
function Promise(callback) {}
