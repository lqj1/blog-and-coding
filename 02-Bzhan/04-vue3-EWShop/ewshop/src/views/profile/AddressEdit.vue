<template>
  <div class="address-edit-box">
    <nav-bar class="nav-bar">
      <template v-slot:default>
        {{title}}
      </template>
    </nav-bar>

    <van-address-edit class="edit" :area-list="areaList" :address-info="addressInfo" :show-delete="type == 'edit'"
      show-set-default show-search-result :search-result="searchResult"
      :area-columns-placeholder="['请选择', '请选择', '请选择']" @save="onSave" @delete="onDelete" />

  </div>
</template>

<script>
import NavBar from "components/common/navbar/NavBar";
import { reactive, onMounted, toRefs, computed } from 'vue'
import { Toast } from 'vant'
import { addAddress, EditAddress, DeleteAddress, getAddressDetail } from 'network/address';
import { tdist } from 'utils/address';
import { useRoute, useRouter } from 'vue-router'


export default {
  components: {
    NavBar
  },
  setup () {
    const route = useRoute()
    const router = useRouter()

    const state = reactive({
      areaList: {
        province_list: {},
        city_list: {},
        county_list: {}
      },
      searchResult: [],
      addressInfo: {},
      type: 'add',
      addressId: '',
      title: ''
    })

    onMounted(() => {
      // 省市区 列表 构造出来
      let _province_list = {};
      let _city_list = {};
      let _county_list = {};

      tdist.getLev1().forEach(p => {
        _province_list[p.id] = p.text;
        tdist.getLev2(p.id).forEach(c => {
          _city_list[c.id] = c.text;
          tdist.getLev3(c.id).forEach(q => {
            _county_list[q.id] = q.text;
          })
        })
      })

      state.areaList.province_list = _province_list;
      state.areaList.city_list = _city_list;
      state.areaList.county_list = _county_list;

      // 获取路由参数
      const { type, addressId } = route.query
      state.type = type
      state.addressId = addressId


      if (type === 'edit') {
        getAddressDetail(addressId).then(res => {
          // 编辑回显可以重新定义一个 对象结构
          const addressDeatil = res

          let _areaCode = ''

          state.addressInfo = {
            name: addressDeatil.name,
            tel: addressDeatil.phone,
            province: addressDeatil.province,
            city: addressDeatil.city,
            county: addressDeatil.county,
            areaCode: _areaCode,
            addressDetail: addressDeatil.address,
            isDefault: !!addressDeatil.is_default,
          }
        })
      }
    })
    // 通过计算属性来对页面标题进行操作
    const title = computed(() => {
      return state.type == 'add' ? '新增地址' : '编辑地址';
    })

    const onSave = (content) => {
      const params = {
        name: content.name,
        phone: content.tel,
        province: content.province,
        city: content.city,
        county: content.county,
        address: content.addressDetail,
        is_default: content.isDefault ? 1 : 0
      }
      if (state.type == 'edit') {
        // 修改数据
        EditAddress(state.addressId, params)
      } else if (state.type == 'add') {
        // 调用接口添加数据
        addAddress(params)
      }
      Toast('保存成功');
      setTimeout(() => {
        router.back();
      }, 1000)
    }
    const onDelete = () => {
      DeleteAddress(state.addressId).then(res => {
        Toast('删除成功')
        setTimeout(() => {
          router.back()
        }, 1000);
      })
    }
    return {
      ...toRefs(state),
      onSave,
      onDelete,
      title
    }
  }
}
</script>

<style lang="scss">
  .edit {
    .van-field__body {
      textarea {
        height: 26px!important;
      }
    }
  }
  .address-edit-box {
    margin-top: 44px;
    .van-address-edit {
      .van-button--danger {
        background: var(--color-tint);
        border-color: var(--color-tint);
      }
      .van-switch--on {
        background:var(--color-tint);
      }
    }
  }

</style>
