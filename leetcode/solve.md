## leetcode16. Z字形变换
将一个给定字符串 s 根据给定的行数 numRows ，以从上往下、从左到右进行 Z 字形排列。

比如输入字符串为 "PAYPALISHIRING" 行数为 3 时，排列如下：

```
P   A   H   N
A P L S I I G
Y   I   R
```
之后，你的输出需要从左往右逐行读取，产生出一个新的字符串，比如："PAHNAPLSIIGYIR"。

请你实现这个将字符串进行指定行数变换的函数：

```
string convert(string s, int numRows);
```

示例 1：

```
输入：s = "PAYPALISHIRING", numRows = 3
输出："PAHNAPLSIIGYIR"
```


示例 2：

```
输入：s = "PAYPALISHIRING", numRows = 4
输出："PINALSIGYAHRPI"
解释：
P     I    N
A   L S  I G
Y A   H R
P     I
```

示例 3：

```
输入：s = "A", numRows = 1
输出："A"
```


提示：

- `1 <= s.length <= 1000`
- `s` 由英文字母（小写和大写）、`','` 和 `'.'` 组成
- `1 <= numRows <= 1000`

### 解答

##### 方法一：模拟法

因为我们知道它有几行，所以只需要模拟它走的整个过程，然后把对应的字母填到相应的行上面，最终将三行凑在一起就可以了

![img](https://pic.leetcode-cn.com/c6404badf766aceaf55cf3639b56e29b88d4a39417f3eee0a1b7ca2db9acc52f-frame_00001.png)

```JavaScript
/**
 * @param {string} s
 * @param {number} numRows
 * @return {string}
 */
var convert = function(s, numRows) {
    if (numRows == 1) {
        return s
    }
    const rows = []
    for(var i = 0;i < numRows; i++) rows[i] = ''
    let loc = 0
    let down = false
    for(const c of s) {
        rows[loc] = rows[loc] + c
        if(loc==0 || loc == numRows - 1)    // 当走到底，开始往右走
            down = !down                    // 往右
        loc = loc + (down ? 1 : -1)         // 到下一行
    }
    let ans = ''
    for(const row of rows) ans += row       // 把三行字符串拼接起来
    return ans
};
```

