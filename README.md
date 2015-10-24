### 一种展示效果
	
当鼠标滑过图片时，从四个角出现一个半透明蒙片，蒙片从顶点开始，沿着对角线向中心扩张，最终占据整个图片


### 用法

#### html元素构建

```html
	div.mask-container
		.mask-high.lt
		.mask-high.rt
		.mask-high.lb
		.mask-high.rb
		.mask-low.above
		.mask-low.under
		img(src="img/show.jpg")
	div.mask-container
		.mask-high.lt
		.mask-high.rt
		.mask-high.lb
		.mask-high.rb
		.mask-low.above
		.mask-low.under
		img(src="img/show2.jpg")
```

mask-high表示高版本情况下的特效；low表示低版本下的特效

lt、rt、lb、rb分别表示左上、右上、左下和右下

#### js控制

```javascript
$(function() {
	$(".mask-container").eq(0).addMask({
		duration: 2000});
	$(".mask-container").eq(1).addMask({
		duration: 1000,
		method: "complex"});
});
```
或者

```javascript
$(function() {
	$(".mask-container").addMask();
});
```

默认情况下，duration是1s，method是auto，即根据浏览器版本自动生成对应效果；

如果method手动设为complex，那么将强制进行高版本效果，在低版本浏览器中，就无法显示特效。所以一般method不用设置，自动为“auto”模式即可。


#### css样式

编译style.scss即可。编译前可根据需要更改mask的颜色和透明度。或者直接引入如下css：

```css
.mask-container {
  overflow: hidden;
  margin: 50px 10px;
  width: 500px;
  float: left;
  position: relative; }
  .mask-container img {
    width: 100%;
    z-index: 0; }

.mask-high,
.mask-low {
  display: inline-block;
  background-color: #93F;
  opacity: 0.4;
  filter: alpha(opacity=40);
  position: absolute; }
```
