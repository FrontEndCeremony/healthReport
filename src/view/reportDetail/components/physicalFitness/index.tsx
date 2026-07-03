import style from './index.module.less'
import BaseModel from '../baseModel'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next';

export default function PhysicalFitness({ physicalFitnessAnalysis = {} }: any) {
    const { t } = useTranslation();

    // 增加默认空对象和解构默认值，防止 undefined 报错
    const { pinHeZhi = 0, qiXuZhi = 0, yangXuZhi = 0, yinXuZhi = 0, tanShiZhi = 0, shiReZhi = 0, xueyuZhi = 0, qiYuZhi = 0, teBingZhi = 0, PhysicalFitnessType = '', OverallCharacteristics = '', CommonManifestations = '', CommonPhysicalCharacteristics = '', psychicCharacteristic = '', IncidenceTendency = '' } = physicalFitnessAnalysis || {};

    const clampScore = (score: number) => Math.max(0, Math.min(100, Number.isFinite(score) ? score : 0));
    const DESIGN_WIDTH = 390;
    const MAX_BAR_HEIGHT_PX = 80;
    const maxBarHeightVw = (MAX_BAR_HEIGHT_PX / DESIGN_WIDTH) * 100;

    // 根据后端传过来的数据，构建数组
    const fitnessData = [
        { name: t('ping_he_zhi'), score: clampScore(pinHeZhi || 0) },
        { name: t('qi_xu_zhi'), score: clampScore(qiXuZhi || 0) },
        { name: t('yang_xu_zhi'), score: clampScore(yangXuZhi || 0) },
        { name: t('yin_xu_zhi'), score: clampScore(yinXuZhi || 0) },
        { name: t('tan_shi_zhi'), score: clampScore(tanShiZhi || 0) },
        { name: t('shi_re_zhi'), score: clampScore(shiReZhi || 0) },
        { name: t('xue_yu_zhi'), score: clampScore(xueyuZhi || 0) },
        { name: t('qi_yu_zhi'), score: clampScore(qiYuZhi || 0) },
        { name: t('te_bing_zhi'), score: clampScore(teBingZhi || 0) },
    ]


    // 找出最高的两个分数对应的体质（如果分数相同，因为 JavaScript 的 sort 是稳定的，或者我们先遇到的排在前面）
    const sortedFitness = [...fitnessData].sort((a, b) => b.score - a.score);
    const top1 = sortedFitness[0];
    const top2 = sortedFitness[1];

    // 为了兼容柱状图的高亮逻辑，依然提取前两名的分数
    const top1Score = top1?.score || 0;
    const top2Score = top2?.score || 0;

    // 控制动画的触发
    const [isAnimated, setIsAnimated] = useState(false);

    useEffect(() => {
        // 组件挂载后，延迟一小段时间触发动画，让浏览器有时间渲染初始状态
        const timer = setTimeout(() => {
            setIsAnimated(true);
        }, 100);
        return () => clearTimeout(timer);
    }, []);

    return (
        <>
            <BaseModel title={t('physical_fitness_evaluation')}>
                <div className={style.topModel}>
                    <div className={style.leftModel}>
                        {top1 && (
                            <div className={style.typeModel}>
                                <div className={style.typeText}>{top1.name}</div>
                                <div className={style.rightRate}>{t('jian')} {top1.score}%</div>
                            </div>
                        )}
                        {top2 && (
                            <div className={style.typeModel}>
                                <div className={style.typeText}>{top2.name}</div>
                                <div className={style.rightRate}>{t('jian')} {top2.score}%</div>
                            </div>
                        )}
                    </div>
                    {/* <div className={style.typeIcon}>
                        <div className={style.leftCycle}></div>
                        <div className={style.rightText}>
                            {OverallCharacteristics?.split(/，|, ?/)[0] || ''}
                        </div>
                    </div> */}
                </div>

                {/* 柱状图模块 */}
                <div className={`${style.lineModel} pdf-avoid-break-chart`}>
                    {fitnessData.map((item, index) => {
                        // 判断是否为最高分的前两个（如果有并列第一的，都算高亮）
                        const isTop2 = item.score === top1Score || item.score === top2Score;
                        const heightVw = isAnimated ? (item.score / 100) * maxBarHeightVw : 0;

                        return (
                            <div className={style.barItem} key={index}>
                                <div className={style.barTrack}>
                                    <div className={`${style.score} ${isAnimated ? style.show : ''}`}>{item.score}</div>
                                    <div
                                        className={`${style.barFill} ${isTop2 ? style.highlight : ''}`}
                                        style={{ height: `${heightVw}vw` }}
                                    ></div>
                                </div>
                                <div className={style.name}>{item.name}</div>
                            </div>
                        )
                    })}
                </div>

                {/* 底部评估结果详情模块 */}
                <div className={style.resultModel}>
                    <div className={style.resultTitle}>{t('physical_fitness_result')}</div>
                    <div className={style.resultDesc}>{t('physical_fitness_desc')}</div>
                    <div className={style.resultDesc}>
                        {t('main_physical_fitness')} <span className={style.highlightText}>{PhysicalFitnessType}</span>
                    </div>

                    <div className={style.tableContainer}>
                        <div className={style.tableRow}>
                            <div className={style.rowLabel}>{t('overall_features')}</div>
                            <div className={style.rowValue}>{OverallCharacteristics}</div>
                        </div>
                        <div className={`${style.tableRow} ${style.activeBak}`}>
                            <div className={style.rowLabel}>{t('common_manifestations')}</div>
                            <div className={style.rowValue}>{CommonManifestations}</div>
                        </div>
                        <div className={style.tableRow}>
                            <div className={style.rowLabel}>{t('physical_features')}</div>
                            <div className={style.rowValue}>{CommonPhysicalCharacteristics}</div>
                        </div>
                        <div className={`${style.tableRow} ${style.activeBak}`}>
                            <div className={style.rowLabel}>{t('psychological_features')}</div>
                            <div className={style.rowValue}>{psychicCharacteristic}</div>
                        </div>
                        <div className={style.tableRow}>
                            <div className={style.rowLabel}>{t('disease_tendency')}</div>
                            <div className={style.rowValue}>{IncidenceTendency}</div>
                        </div>
                    </div>
                </div>
            </BaseModel>
        </>
    )
}
