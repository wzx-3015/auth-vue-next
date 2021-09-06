/*
 * @Description: echarts 按需引入
 * @Author: @Xin (834529118@qq.com)
 * @Date: 2021-04-20 09:38:37
 * @LastEditTime: 2021-04-26 16:03:37
 * @LastEditors: @Xin (834529118@qq.com)
 */
import * as echarts from 'echarts/core'

// 引入柱状图图表，图表后缀都为 Chart
import { BarChart, LineChart, PieChart } from 'echarts/charts'
// 引入提示框，标题，直角坐标系组件，组件后缀都为 Component
import { TitleComponent, TooltipComponent, GridComponent, LegendComponent } from 'echarts/components'
// 引入 Canvas 渲染器，注意引入 CanvasRenderer 或者 SVGRenderer 是必须的一步
import { CanvasRenderer } from 'echarts/renderers'

// 注册必须的组件
echarts.use([TitleComponent, TooltipComponent, GridComponent, BarChart, LineChart, LegendComponent, PieChart, CanvasRenderer])

export default echarts
