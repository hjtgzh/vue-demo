/*
 * @文件描述:
 * @公司: thundersdata
 * @作者: 黄建停
 * @Date: 2019-07-30 21:39:01
 * @LastEditors: 黄建停
 * @LastEditTime: 2019-08-01 20:57:28
 */
import { GetterTree } from 'vuex';
import { MapState } from './types';
import { RootState } from '../types';

// 提供用来获取state数据的方法
export const getters: GetterTree<MapState, RootState> = {
  // 路线分布
  worldMapOption(state): object {
    let handleLineArr: any = [];
    let handleAddressArr: any = [];

    let dataInfoArr = state.worldMap;
    // 首页的map数据结构
    dataInfoArr.forEach(lineDataItem => {
      const lineArr = lineDataItem.line;
      if (lineArr && lineArr.length > 0) {
        handleMapData(lineDataItem.name, lineArr, handleLineArr, handleAddressArr);
      }
    });

    handleAddressArr.push(
      { name: '韩国', value: [126.58, 37.33] },
      { name: '日本', value: [135.498581, 34.67373] },
      { name: '青岛', value: [119.3, 35.35] },
    );

    const startArr = [
      { name: '山东', value: [117.120095, 36.6512] },
      {
        name: '韩国',
        value: [126.58, 37.33],
        label: {
          show: true,
          formatter: '{b}',
          position: 'right',
          fontSize: 20,
          color: 'black',
        },
      },
      {
        name: '日本',
        value: [135.498581, 34.67373],
        label: {
          show: true,
          formatter: '{b}',
          position: 'right',
          fontSize: 20,
          color: 'black',
        },
      },
    ];
    // console.log('handleAddressArr', handleAddressArr);

    // 每个地区的设备告警数量
    var showList = [
      {
        name: '杜伊斯堡',
        value: 11670,
        arrivalDays: 17,
      },
      {
        name: '莫斯科',
        value: 9588,
        arrivalDays: 14,
      },
      {
        name: '明斯克',
        value: 10118,
        arrivalDays: 15,
      },
      {
        name: '塔什干',
        value: 6038,
        arrivalDays: 10,
      },
      {
        name: '河内',
        value: 3163,
        arrivalDays: 5,
      },
      {
        name: '乌兰巴托',
        value: 2162,
        arrivalDays: 9,
      },
    ];
    const handleAddressObj: any = {};
    handleAddressArr.forEach((item: any) => {
      handleAddressObj[item.name] = item.value;
    });
    var convertData = function(data: any) {
      var res = [];
      for (var i = 0; i < data.length; i++) {
        var geoCoord = handleAddressObj[data[i].name];
        if (geoCoord) {
          res.push({
            name: data[i].name,
            value: geoCoord.concat(data[i].value),
          });
        }
      }
      // 有数据的地区的名称和value值
      return res;
    };

    const end = { name: '青岛', value: [119.3, 35.35] };
    const others = handleAddressArr.filter((item: any) => item.name !== '山东');
    const newSeries: any = [];
    const seriesArr = [
      { handleLineArr: handleLineArr, start: startArr[0], others: others },
      // 韩国线路
      {
        handleLineArr: [{ coords: [[126.58, 37.33], [119.3, 35.35]], name: '中亚' }],
        start: startArr[1],
        others: end,
      },
      // 日本线路
      {
        handleLineArr: [{ coords: [[135.498581, 34.67373], [119.3, 35.35]], name: '中亚' }],
        start: startArr[2],
        others: end,
      },
    ];
    seriesArr.forEach(item => {
      newSeries.push(
        /*线*/
        {
          type: 'lines',
          coordinateSystem: 'geo',
          symbol: 'none',
          effect: {
            show: true,
            symbol: 'roundRect',
            period: 1.5,
            delay: 100,
            trailLength: 0.8,
            symbolSize: 6,
          },
          lineStyle: {
            color: item.others === end ? '#b7eefd' : '#ffffff',
            width: '5',
            curveness: '0.1',
          },
          data: item.handleLineArr,
        },
        /*终点*/
        {
          type: 'effectScatter',
          coordinateSystem: 'geo',
          showEffectOn: 'render',
          zlevel: 3,
          symbol: 'circle',
          symbolSize: item.others == end ? 0 : 20, //
          rippleEffect: {
            brushType: 'stroke',
            period: 3,
            scale: 3,
          },
          itemStyle: {
            show: false,
            color: '#35D003',
          },
          data: item.others,
        },
        /*起点*/
        {
          type: 'effectScatter',
          coordinateSystem: 'geo',
          showEffectOn: 'render',
          zlevel: 3,
          symbol: 'circle',
          symbolSize: item.others === end ? 20 : 30,
          rippleEffect: {
            brushType: 'stroke',
            period: 3,
            scale: 2,
          },
          label: {
            show: true,
            formatter: '{b}',
            position: 'right',
            fontSize: 20,
            color: '#fe3100',
          },
          itemStyle: {
            show: true,
            color: item.others === end ? '#35D003' : '#fe3100',
          },
          data: [
            {
              label: {
                show: true,
                formatter: '{b}',
                position: 'right',
                fontSize: 20,
                color: '#fe3100',
              },
              ...item.start,
            },
          ],
        },
        {
          name: '点',
          type: 'scatter',
          coordinateSystem: 'geo',
          hoverAnimation: false,
          legendHoverLink: false,
          symbol: `image://${require('@/assets/flag.png')}`,
          symbolOffset: ['45%', '-45%'],
          symbolSize: 90,
          label: {
            show: true,
            textStyle: {
              color: 'rgba(255, 255, 255)',
            },
            padding: [0, 0, 15, 0],
            // label样式定义
            rich: {
              lineStyle: {
                color: '#fff',
              },
              timeStyle: {
                lineHeight: 20,
                color: '#fff',
              },
            },
            formatter: ({ name }: any) => {
              const { value, arrivalDays }: any = showList.find(item => item.name === name) || {};
              // return `运输距离: \n${value}公里\n时长: ${arrivalDays}天`;
              return (
                '{lineStyle|运输距离: \n' +
                value +
                '公里}\n{timeStyle|时长: 约' +
                arrivalDays +
                '天}'
              );
            },
          },
          zlevel: 6,
          data: convertData(showList),
        },
      );
    });
    return {
      backgroundColor: 'transparent',
      geo: {
        type: 'map',
        map: 'world',
        roam: false,
        zoom: 2.1,
        center: [87.617733, 43.792818],
        itemStyle: {
          areaColor: '#019ffb',
        },
      },
      series: newSeries,
    };
  },
};

/**
 * 处理故事返回数据
 * @param 返回数据的数组 lineArr
 * @param 线路的数组 handleLineArr
 * @param 线路点的数组 handleAddressArr
 */
function handleMapData(lineName: any, lineArr: any, handleLineArr: any, handleAddressArr: any) {
  lineArr.forEach((item: any, index: any) => {
    handleLineArr.push({
      name: lineName,
      coords: [[item.start.lon, item.start.lat], [item.end.lon, item.end.lat]],
    });
    if (handleAddressArr.findIndex((ele: any) => ele.name === item.start.location) === -1) {
      handleAddressArr.push({
        name: item.start.location,
        value: [item.start.lon, item.start.lat],
        label: {
          show: true,
          formatter: '{b}',
          position: changeLabelPosition(item.start.location),
          distance: 0,
          fontSize: 14,
          textStyle: {
            color: 'black',
          },
        },
      });
    }
    if (handleAddressArr.findIndex((ele: any) => ele.name === item.end.location) === -1) {
      handleAddressArr.push({
        name: item.end.location,
        value: [item.end.lon, item.end.lat],
        label: {
          show: true,
          formatter: '{b}',
          position: changeLabelPosition(item.end.location),
          distance: 0,
          fontSize: 14,
          textStyle: {
            color: 'black',
          },
        },
      });
    }
  });
}

/**
 * 按照地点的名字调整名字的位置（上下左右）
 * @param {*} locationList
 */
function changeLabelPosition(locationName: any) {
  switch (locationName) {
    case '乌兰乌德':
    case '安热罗苏真斯克':
    case '叶卡捷琳堡':
    case '罗兹':
    case '阿拉山口':
    case '凭祥':
    case '吉隆坡':
    case '希姆肯特':
    case '克列希哈':
    case '切尔尼科夫卡':
    case '阿斯塔纳':
    case '沃尔西诺':
    case '热特苏':
    case '塔什干':
    case '塔拉兹':
    case '塞拉姆':
      return 'top';

    case '梅杰乌':
    case '丘库尔赛':
    case '谢尔盖利':
    case '伊尔库茨克':
    case '霍尔果斯':
    case '吉扎克':
    case '乌尔根奇':
      return 'left';

    case '比什凯克':
    case '汉堡':
    case '阿拉木图':
    case '安集延-北':
    case '乌卢格别克':
    case '阿汉加兰':
      return 'right';

    default:
      return 'bottom';
  }
}
