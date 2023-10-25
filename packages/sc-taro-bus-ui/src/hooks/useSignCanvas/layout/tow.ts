import { imageUrl } from '@/utils/busUtils';

let layouttow = {
  name: '版式2',
  imageUrl: imageUrl('/wx-images/clockin/lay2.png', true),
  id: '2',
  index: '2',
  useFlag: false,
  backgroundUrl: '',
  backgroundColor: '',
  graph: [
    {
      type: 'rect',
      w: 604,
      h: 126,
      x: 27,
      y: 505,
      radius: 10,
      bgColor: 'rgba(255,255,255,0.9)',
    },
    {
      w: 88,
      h: 88,
      x: 79,
      y: 524,
      type: 'image',
      dataIndex: 'avatarUrl',
      value: '',
      radius: 44,
    },
    {
      type: 'text',
      value: '',
      dataIndex: 'title',
      fontSize: 18,
      color: '#333333',
      isVertical: true,
      x: 593,
      y: 524,
    },
    {
      w: 76,
      h: 76,
      x: 509,
      y: 530,
      type: 'image',
      value: '',
      dataIndex: 'qrCode',
    },
    {
      type: 'text',
      id: '1',
      value: '',
      fontSize: 28,
      dataIndex: 'wordContent',
      lineHeight: 42,
      fontWeight: 'bold',
      w: 473,
      x: 27,
      y: 29,
    },
    {
      type: 'text',
      value: '',
      dataIndex: 'signCountText',
      fontSize: 22,
      color: '#333333',
      x: 218,
      y: 534,
    },
    {
      type: 'text',
      value: '',
      dataIndex: 'signCount',
      fontSize: 38,
      fontWeight: 'bold',
      color: '#333333',
      x: 216,
      y: 579,
      id: '2',
    },
    {
      type: 'text',
      value: '天',
      fontSize: 21,
      color: '#333333',
      follow: 'signCount',
      x: 6,
      y: 586,
      id: '3',
    },
    {
      type: 'text',
      value: '签到时间',
      fontSize: 22,
      color: '#333333',
      x: 372,
      y: 534,
    },
    {
      type: 'text',
      value: '',
      dataIndex: 'signTime',
      fontSize: 34,
      fontWeight: 'bold',
      color: '#333333',
      x: 373,
      y: 578,
    },
    {
      type: 'text',
      value: '',
      dataIndex: 'signDataDay',
      fontSize: 42,
      align: 'right',
      x: -28,
      y: 33,
    },
    {
      type: 'text',
      value: '',
      dataIndex: 'signDataYearMonth',
      fontSize: 20,
      align: 'right',
      x: -27,
      y: 82,
    },
  ],
};

export default {
  layouttow: layouttow,
};