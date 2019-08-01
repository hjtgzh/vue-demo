/*
 * @文件描述:
 * @公司: thundersdata
 * @作者: 黄建停
 * @Date: 2019-07-30 21:39:01
 * @LastEditors: 黄建停
 * @LastEditTime: 2019-08-01 20:02:20
 */
import { GetterTree } from 'vuex';
import { HomeState } from './types';
import { RootState } from '../types';
import { maxScale, getMaxNearNumber } from '@/utils/array';

// 提供用来获取state数据的方法
export const getters: GetterTree<HomeState, RootState> = {
  // 路线分布
  routeDistributeOption(state): object {
    const color = ['#db6264', '#006eff', '#eee611', '#20EE8C', '#7533d6', '#d7941a', '#d7941a'];
    const routeDistribute = state.routeDistribute;
    if (routeDistribute.length === 0) return {};
    routeDistribute.sort((a, b) => b.value - a.value);
    const total = routeDistribute.reduce((acc, curr) => (acc += curr.value), 0);
    const routeDistributeSeries = [
      {
        type: 'pie',
        clockWise: true,
        hoverAnimation: true,
        hoverOffset: 18,
        radius: ['40%', '55%'],
        center: ['40%', '50%'],
        label: {
          show: false,
          position: 'center',
        },
        labelLine: {
          show: false,
        },
        data: routeDistribute.map(item => ({
          name: `${item.name}: ${item.value}列`,
          value: item.value / total,
          lineNameValue: item.line_name,
        })),
      },
    ];
    const option = {
      color,
      legend: {
        right: '5%',
        y: 'center',
        orient: 'vertical',
        icon: 'circle',
        data: routeDistribute.map(item => `${item.name}: ${item.value}列`),
        textStyle: {
          color: '#ffffff',
        },
      },
      tooltip: {
        trigger: 'item',
        backgroundColor: 'transparent',
        formatter: ({ name }: { name: string }) => {
          return name;
        },
        textStyle: {
          fontSize: 30,
        },
        position: [5, 5],
      },
      series: routeDistributeSeries,
    };
    return option;
  },
  // 各市开行情况
  runInfoOption(state): object {
    const runInfo = state.runInfo || [];
    if (runInfo.length === 0) return {};
    const yMaxNumberArr = maxScale(Math.max(...runInfo.map(item => item.value)));
    const yMaxNumber = yMaxNumberArr && yMaxNumberArr[0];
    // 暂时不用
    const series = runInfo.map((item, index, arry) => {
      const data = new Array(arry.length).fill('-');
      data[index] = item.value;
      // data[index] = { name: item.name, value: item.value, cityValue: item.city_value };
      return {
        name: item.name,
        type: 'pictorialBar',
        smooth: false,
        legendHoverLink: false,
        symbol: 'path://M0,10 L10,10 C5.5,10 5.5,5 5,0 C4.5,5 4.5,10 0,10 z',
        barCategoryGap: '0%',
        label: {
          show: true,
          position: 'top',
        },
        data,
        itemStyle: {
          normal: {
            color: '#f26666',
          },
        },
      };
    });
    const option = {
      grid: {
        left: '3%',
        right: '5%',
        bottom: '8%',
        containLabel: true,
      },
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'shadow',
        },
        formatter: (params: any) => {
          let name, value;
          params.some((ele: any) => {
            if (ele.value !== '-' && ele.value !== 0) {
              name = ele.name;
              value = ele.value;
              return true;
            } else if (ele.value === 0) {
              name = ele.name;
              value = 0;
              return true;
            }
          });
          return `${name}: ${value}`;
        },
      },
      xAxis: {
        type: 'category',
        boundaryGap: true,
        data: runInfo.map(item => item.name),
        axisLine: {
          lineStyle: {
            color: '#00b9fd',
          },
        },
        axisLabel: {
          rotate: -30,
          color: '#ffffff',
        },
      },
      yAxis: {
        type: 'value',
        name: '单位：列',
        axisLine: {
          lineStyle: {
            color: '#00b9fd',
          },
        },
        axisLabel: {
          color: '#ffffff',
        },
        splitLine: {
          show: false,
        },
      },
      series: [
        {
          type: 'pictorialBar',
          barCategoryGap: '0%',
          label: {
            show: true,
            position: 'top',
            color: '#fff',
          },
          symbol: 'path://M0,10 L10,10 C5.5,10 5.5,5 5,0 C4.5,5 4.5,10 0,10 z',
          itemStyle: {
            normal: {
              color: '#f26666',
            },
          },
          data: runInfo.map(item => item.value),
        },
        {
          type: 'bar',
          barGap: '-100%',
          itemStyle: {
            color: '#fff',
            opacity: 0,
          },
          data: runInfo.map(() => yMaxNumber),
          z: 5,
        },
      ],
    };
    return option;
  },
  // 货物品类TOP5
  goodsDistributionOption01(state): object {
    const goodsDistribution = state.goodsDistribution.slice(0, 5).reverse();
    const rank = [5, 4, 3, 2, 1];
    if (goodsDistribution === undefined || goodsDistribution.length === 0) return {};
    new Array(rank.length - goodsDistribution.length).fill('').forEach(() => rank.shift());
    const grayBar = getMaxNumberArr(state.goodsDistribution.map(item => item.value));
    const option = {
      grid: {
        top: '5%',
        bottom: '5%',
      },
      xAxis: [
        {
          show: false,
        },
        {
          show: false,
        },
        {
          show: false,
        },
      ],
      yAxis: {
        type: 'category',
        axisLabel: {
          show: true,
          color: '#00C5CD',
          fontSize: 20,
          padding: [0, 5, 0, 5],
          rich: {
            label: {
              width: 20,
              height: 20,
              lineHeight: 20,
              borderRadius: 50,
              align: 'center',
              color: '#000000',
              backgroundColor: '#00bfff',
            },
          },
          formatter: (value: number) => {
            return `{label|${value}}`;
          },
        },
        axisTick: {
          show: false,
        },
        axisLine: {
          show: false,
        },
        data: rank,
      },
      tooltip: {
        trigger: 'axis',
        formatter: (params: any) => {
          const {
            data: { name, value },
          } = params[1];
          return `${name}: ${value}TEU`;
        },
      },
      series: [
        {
          type: 'bar',
          barGap: '-100%',
          barWidth: 15, //统计条宽度
          itemStyle: {
            barBorderRadius: 20,
            color: 'rgba(102, 102, 102,0.5)',
          },
          z: 1,
          data: grayBar,
        },
        {
          type: 'bar',
          barGap: '-100%',
          barWidth: 15, //统计条宽度
          itemStyle: {
            normal: {
              barBorderRadius: 20, //统计条弧度
              color: {
                colorStops: [
                  {
                    offset: 0,
                    color: '#006eff', // 0% 处的颜色
                  },
                  {
                    offset: 1,
                    color: '#0acdf4', // 100% 处的颜色
                  },
                ],
              },
            },
          },
          label: {
            show: false,
            textStyle: {
              color: '#fff',
            },
            position: 'insideRight',
            formatter: ({ dataIndex }: any) => {
              return goodsDistribution[dataIndex].value;
            },
          },
          labelLine: {
            show: false,
          },
          z: 2,
          data: goodsDistribution,
        },
        {
          show: true,
          type: 'bar',
          xAxisIndex: 1,
          barGap: '-100%',
          barWidth: 15,
          itemStyle: {
            normal: {
              color: 'transparent',
            },
          },
          label: {
            normal: {
              show: true,
              color: '#ffffff',
              position: [0, -15],
              formatter: ({ dataIndex }: any) => {
                return goodsDistribution[dataIndex].name;
              },
            },
          },
          data: goodsDistribution,
        },
        {
          type: 'bar',
          xAxisIndex: 2,
          barGap: '-100%',
          barWidth: 15, //统计条宽度
          itemStyle: {
            normal: {
              color: 'transparent',
            },
          },
          label: {
            normal: {
              show: true,
              color: '#ffffff',
              position: ['80%', -15],
              formatter: ({ dataIndex }: any) => {
                return goodsDistribution[dataIndex].value + 'TEU';
              },
              offset: [30, 0],
            },
          },
          data: goodsDistribution,
        },
      ],
    };
    return option;
  },
  goodsDistributionOption02(state): object {
    const goodsDistribution = state.goodsDistribution.slice(5).reverse();
    const rank = [10, 9, 8, 7, 6];
    if (goodsDistribution === undefined || goodsDistribution.length === 0) return {};
    new Array(rank.length - goodsDistribution.length).fill('').forEach(() => rank.shift());
    const grayBar = getMaxNumberArr(state.goodsDistribution.map(item => item.value));
    const option = {
      grid: {
        top: '5%',
        bottom: '5%',
      },
      xAxis: [
        {
          show: false,
        },
        {
          show: false,
        },
        {
          show: false,
        },
      ],
      yAxis: {
        type: 'category',
        axisLabel: {
          show: true,
          color: '#00C5CD',
          fontSize: 20,
          padding: [0, 5, 0, 5],
          rich: {
            label: {
              width: 20,
              height: 20,
              lineHeight: 20,
              borderRadius: 50,
              align: 'center',
              color: '#000000',
              backgroundColor: '#00bfff',
            },
          },
          formatter: (value: number) => {
            return `{label|${value}}`;
          },
        },
        axisTick: {
          show: false,
        },
        axisLine: {
          show: false,
        },
        data: rank,
      },
      tooltip: {
        trigger: 'axis',
        formatter: (params: any) => {
          const {
            data: { name, value },
          } = params[1];
          return `${name}: ${value}TEU`;
        },
      },
      series: [
        {
          type: 'bar',
          barGap: '-100%',
          barWidth: 15, //统计条宽度
          itemStyle: {
            barBorderRadius: 20,
            color: 'rgba(102, 102, 102,0.5)',
          },
          z: 1,
          data: grayBar,
        },
        {
          type: 'bar',
          barGap: '-100%',
          barWidth: 15, //统计条宽度
          itemStyle: {
            normal: {
              barBorderRadius: 20, //统计条弧度
              color: {
                colorStops: [
                  {
                    offset: 0,
                    color: '#006eff', // 0% 处的颜色
                  },
                  {
                    offset: 1,
                    color: '#0acdf4', // 100% 处的颜色
                  },
                ],
              },
            },
          },
          label: {
            show: false,
            textStyle: {
              color: '#fff',
            },
            position: 'insideRight',
            formatter: ({ dataIndex }: any) => {
              return goodsDistribution[dataIndex].value;
            },
          },
          labelLine: {
            show: false,
          },
          z: 2,
          data: goodsDistribution,
        },
        {
          show: true,
          type: 'bar',
          xAxisIndex: 1,
          barGap: '-100%',
          barWidth: 15,
          itemStyle: {
            normal: {
              color: 'transparent',
            },
          },
          label: {
            normal: {
              show: true,
              color: '#fff',
              position: [0, -15],
              formatter: ({ dataIndex }: any) => {
                return goodsDistribution[dataIndex].name;
              },
            },
          },
          data: goodsDistribution,
        },
        {
          type: 'bar',
          xAxisIndex: 2,
          barGap: '-100%',
          barWidth: 15, //统计条宽度
          itemStyle: {
            normal: {
              color: 'transparent',
            },
          },
          label: {
            normal: {
              show: true,
              color: '#fff',
              position: ['80%', -15],
              formatter: ({ dataIndex }: any) => {
                return goodsDistribution[dataIndex].value + 'TEU';
              },
              offset: [30, 0],
            },
          },
          data: goodsDistribution,
        },
      ],
    };
    return option;
  },
};

function getMaxNumberArr(list: Array<any>) {
  const grayBarNumber = getMaxNearNumber(list);
  const grayBar = [grayBarNumber, grayBarNumber, grayBarNumber, grayBarNumber, grayBarNumber];
  return grayBar;
}
