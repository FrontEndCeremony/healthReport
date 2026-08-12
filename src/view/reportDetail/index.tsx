import style from './index.module.less';
import header from '@/assets/header.svg';
import headerHK from '@/assets/headerHK.svg';
import QRimg from '@/assets/QRimg.png';
import UserInformation from './components/userInformation';
import HealthEvaluation from './components/healthEvaluation';
import Tongue from './components/tongue';
import PulseEvaluation from './components/pulseEvaluation';
import PhysicalFitness from './components/physicalFitness';
import HealthManagementPlan from './components/healthManagementPlan';
import LoadingState from './components/loadingState';
import { exportImage } from '@/utils/exportImage';
import { throttle } from '@/utils/tool'
import { getHealthReport } from '@/api/report'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next';

export default function ReportDetail() {
    const { t, i18n } = useTranslation();

    const uuid = window.location.pathname.split('/')[window.location.pathname.split('/').length - 1]  // 从地址链接中获取uuid

    const langue = window.location.search.split('=')[1]  // 从地址链接中获取langue

    // 动态监听 langue 参数变化，确保在页面渲染时更新 i18n
    useEffect(() => {
        if (langue === 'HK') {
            i18n.changeLanguage('zh-HK');
        } else {
            i18n.changeLanguage('zh-CN');
        }
    }, [langue, i18n]);

    const [checkTime,setCheckTime] = useState('') // 检测时间

    const [patientInfo,setPatientInfo] = useState(null) // 患者信息，初始值为 null 以便判断加载状态

    const [comprehensiveAnalysis,setComprehensiveAnalysis] = useState('') // 中医健康评估

    const [tongueEvaluation,setTongueEvaluation] = useState(null) // 舌像评估

    const [pulseConditionEvaluation,setPulseConditionEvaluation] = useState(null) // 脉搏评估评估

    const [physicalFitnessAnalysis,setPhysicalFitnessAnalysis] = useState(null) // 体质评估

    const [healthHanagementHlan, setHealthHanagementHlan] = useState(null) // 健康管理方案

    const [isTimeout, setIsTimeout] = useState(false) // 记录是否生成超时
    const [isNotFound, setIsNotFound] = useState(false) // 记录是否未找到报告

    const [isExporting, setIsExporting] = useState(false) // 导出加载状态
    const [exportImgUrl, setExportImgUrl] = useState<string | null>(null) // 生成的长图URL

    useEffect(() => {
        let timer: ReturnType<typeof setTimeout>;
        let retryCount = 0;
        const maxRetries = 9;

        const fetchReport = () => {
            getHealthReport({ uuid, langue }).then(res => {
                if(res.code == 0){
                    // 分发消息
                    const data = res.data;
                    setCheckTime(data.checkTime) // 设置检测时间
                    setPatientInfo(data.patientInfo) // 设置患者信息
                    setComprehensiveAnalysis({
                        ...data.comprehensiveAnalysis,
                        comprehensive_result:data.comprehensive_result,
                        health_risk: data.health_risk.map( (item,index) =>{
                            return {
                                risk_type: item.risk_type,
                                risk_detail: item.risk_detail,
                                id: index,
                                open: false
                            }
                        }),
                        condition_suggestion:data.condition_suggestion,
                    }) // 设置中医健康评估
                    setTongueEvaluation(data.tongueEvaluation) // 设置舌像评估
                    setPulseConditionEvaluation(data.pulseConditionEvaluation) // 设置脉搏评估评估
                    setPhysicalFitnessAnalysis(data.physicalFitnessAnalysis) // 【修复】必须把接口的体质数据存入 state
                    setHealthHanagementHlan(data.healthHanagementHlan) // 设置健康管理方案
                } else if( res.code == 404){
                    // 处理404
                    setIsNotFound(true);
                } else if( res.code == 20201){
                    // 报告在生成中，延迟十秒调用一次，最多调用9次
                    if (retryCount < maxRetries) {
                        retryCount++;
                        timer = setTimeout(() => {
                            fetchReport();
                            clearTimeout(timer)
                        }, 10000); // 10秒后重试
                    } else {
                        // 超过最大重试次数，可以提示用户报告生成超时
                        console.warn('报告生成超时');
                        setIsTimeout(true);
                    }
                }
            }).catch(err => {
                console.error('获取报告失败', err);
                // 也可以根据实际情况，把网络错误归类为 timeout 或者 notFound
            })
        };

        fetchReport();

        return () => {
            if (timer) {
                clearTimeout(timer);
            }
        };
    }, [uuid, langue])

    // 在数据未加载完成前，可以返回 Loading 状态，防止子组件拿到空数据提前渲染
    if (!patientInfo) {
        if (isNotFound) {
            return <LoadingState type="notFound" message={t('report_not_found')} desc={t('report_not_found_desc')} />;
        }
        if (isTimeout) {
            return <LoadingState type="timeout" message={t('report_timeout')} desc={t('report_timeout_desc')} />;
        }
        return <LoadingState message={t('loading')} />;
    }

    const handleExport = async () => {
        setIsExporting(true);
        const imgData = await exportImage('report-content');
        if (imgData) {
            setExportImgUrl(imgData);
        }
        setIsExporting(false);
    };

    const handleCloseModal = () => {
        setExportImgUrl(null);
    };

    return (
        <div className={style.content} id="report-content">
            <div className={`${style.topImg} pdf-avoid-break`}>
                <img src={langue === 'HK' ? headerHK : header} />
            </div>
            <UserInformation patientInfo={patientInfo}></UserInformation>
            <HealthEvaluation comprehensiveAnalysis={comprehensiveAnalysis}></HealthEvaluation>
            <Tongue tongueEvaluation={tongueEvaluation}></Tongue>
            <PulseEvaluation pulseConditionEvaluation={pulseConditionEvaluation}></PulseEvaluation>
            <PhysicalFitness physicalFitnessAnalysis={physicalFitnessAnalysis}></PhysicalFitness>
            <HealthManagementPlan healthHanagementHlan={healthHanagementHlan}></HealthManagementPlan>
            <div className={`${style.bottomTip} pdf-avoid-break`}>
                <div className={style.bottomTitle}>{t('instruction')}</div>
                <div>{t('instruction_1')}</div>
                <div>{t('instruction_2')}</div>
                <div>{t('instruction_3')}</div>
            </div>
            <div className={`${style.bottomButton} pdf-hide`} onClick={throttle(() => handleExport(), 5000)}>
                {isExporting ? t('loading') : t('save_image')}
            </div>
            <div className={style.QRCodeText}>{t('qrcode_tip')}</div>
            <div className={style.QRCodeImg}>
                <img src={QRimg} />
            </div>
            <div className={`${style.bottomText} pdf-avoid-break`}>
                {t('copyright')}
            </div>
            <div className={`${style.bottomText} pdf-avoid-break`}>
                {t('generate_time')}{checkTime}
            </div>

            {/* 长图预览弹窗 */}
            {exportImgUrl && (
                <div className={style.imageModal}>
                    <div className={style.modalMask} onClick={handleCloseModal}></div>
                    <div className={style.modalContent}>
                        <div className={style.modalHeader}>
                            <span className={style.modalTitle}>{t('long_press_save')}</span>
                            <span className={style.closeBtn} onClick={handleCloseModal}>{t('close')}</span>
                        </div>
                        <div className={style.imageContainer}>
                            <img src={exportImgUrl} alt="Report" className={style.previewImage} />
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}
