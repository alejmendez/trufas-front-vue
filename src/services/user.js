import { pb } from '@/utils/pocket_base'

const list = async (order = '-created') => {
  return await pb.collection('users').getList(1, 50, {
    sort: order,
    fields: 'id, dni, email, name, phone, role, expand.roles(role).name',
    expand: 'roles(role)'
  });
}

export default {
  list,
}
