// components/mesCard/mesCard.js
Component({
    /**
     * 组件的属性列表
     */
    properties: {
        mescontent: {
            type: Object,
            value: {
                title: '小麦病虫综合防治技术',
                src: '1212121',
                message: '小麦病虫种类多，为害期长，在防治上要坚持“预防为主，综合防治”的植保方针，加强病虫的预测预报，掌握控害的主动权，以农业防治为基础，重点防治小麦纹枯病、赤霉病、白粉病、汲浆虫、穗蚜，兼治其他病虫；选用高效、低毒、低残留农药，减少用药次数，降低用药量，以保护天敌减轻病虫为害，应采取以下技术措施。'
            }
        }
    },

    /**
     * 组件的初始数据
     */
    data: {
        imgFlag: false
    },
    lifetimes: {
        attached() {
            if (this.properties.mescontent.src.length) {
                this.setData({
                    imgFlag: true
                })
            }
        }
    },
    /**
     * 组件的方法列表
     */
    methods: {

    }
})
