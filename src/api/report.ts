import request from '@/utils/request'

interface healthData {
    uuid: string,
    langue: string
}

export function getHealthReport(data:healthData) {
  const id = data.uuid;
  const params = {
    langue: data.langue || 'zh-CN',
  }
  return request({
    url: `/reportDetail/${id}`, 
    method: 'get',
    params
  })
}
