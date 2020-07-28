## v-keep

v-keep: 用于拦截组件更新，当有大列表时，可以使用。一般配合 `<v-set query="..."></v-set>`, 做拦截和定向更新。

要了解 v-keep 的用途，我们先模拟一个大列表更新的性能问题，我们渲染一个5000长度的列表，并且设定v-txt动态更新内容。
这会导致每次输入都有5000个元素被派发更新，虽然[Verk]的状态管理性能很高，但是在这种极端条件下我们在输入框输入明显能感觉到页面开始卡顿了。

<!-- ```html::{view:true, style:"height:300px"}
<div>请编辑左侧的数组长度，把Array(100)改为Array(5000)</div>
<v-for len="$hook.list.length">
  <div>item: <v-txt>$hook.list[@i]</v-txt></div>
  <v-set oninput="e=>$hook.list[@i] = e.target.value">
    <input />
  </v-set>
</v-for>
<script>
  $hook.list = Array(100).fill('');
</script>
``` -->

现在我们使用 `v-keep` 和 `v-set: query` 优化这个案例, 注意，[Verk] 会默认派发整个网页所有动态标签的动态属性更新，所以请先把上一个编辑器的数组改回 `Array(100)`。

```html::{view:true, style:"height:300px"}
<div>请编辑左侧的数组长度，把Array(100)改为Array(5000)：</div>
<v-keep>
  <v-for len="$hook.list.length">
    <div item-@i >item: <v-txt>$hook.list[@i]</v-txt></div>
    <v-set query="[item-@i]" oninput="e=>$hook.list[@i] = e.target.value">
      <input />
    </v-set>
  </v-for>
</v-keep>
<script>
  $hook.list = Array(5000).fill('');
</script>
```