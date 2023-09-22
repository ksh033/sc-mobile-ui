import { imageUrl } from '@/utils/busUtils';

let layoutthree = {
  name: '版式3',
  imageUrl: imageUrl('/wx-images/clockin/lay3.png', true),
  id: '3',
  index: '3',
  useFlag: false,
  graph: [
    {
      w: 410,
      h: 410,
      x: 24,
      y: 124,
      radius: 20,
      type: 'image',
      dataIndex: 'imageUrl',
      value: '',
    },
    {
      w: 68,
      h: 68,
      x: 28,
      y: 30,
      type: 'image',
      dataIndex: 'avatarUrl',
      value: '',
      radius: 34,
    },
    {
      type: 'text',
      value: '',
      dataIndex: 'title',
      fontSize: 15,
      color: '#333333',
      x: 366,
      y: 626,
    },
    {
      w: 58,
      h: 58,
      x: 374,
      y: 557,
      type: 'image',
      value: '',
      dataIndex: 'qrCode',
    },
    {
      type: 'text',
      id: '1',
      value: '',
      dataIndex: 'wordContent',
      fontSize: 20,
      fontWeight: 'bold',
      lineHeight: 8,
      baseline: 'bottom',

      color: '#333333',
      w: 300,
      x: 25,
      y: 641,
    },
    {
      type: 'text',
      value: '',
      dataIndex: 'signTime',
      fontSize: 31,
      fontWeight: 'bold',
      lineHeight: 19,
      color: '#333333',
      x: 115,
      y: 53,
    },
    {
      type: 'text',
      value: '签到',
      follow: 'signTime',
      fontSize: 16,
      color: '#333333',
      x: 7,
      y: 59,
    },
    {
      type: 'text',
      value: '',
      dataIndex: 'signCount',
      fontSize: 31,
      fontWeight: 'bold',
      lineHeight: 19,
      color: '#333333',
      x: 256,
      y: 53,
      id: '2',
    },
    {
      type: 'text',
      value: '',
      dataIndex: 'signText',
      fontSize: 16,
      color: '#333333',
      follow: 'signCount',
      x: 8,
      y: 59,
    },
    {
      type: 'text',
      value: '',
      dataIndex: 'signCountText',
      fontSize: 16,
      color: '#333333',
      follow: 'signText',
      x: 8,
      y: 59,
    },
    {
      type: 'text',
      value: '',
      dataIndex: 'signDataDay',
      fontSize: 29,
      align: 'right',
      x: -45,
      y: 146,
    },
    {
      type: 'text',
      value: '',
      dataIndex: 'signDataYearMonth',
      fontSize: 14,
      align: 'right',
      x: -44,
      y: 175,
    },
  ],
};

export default {
  layoutthree: layoutthree,
};
