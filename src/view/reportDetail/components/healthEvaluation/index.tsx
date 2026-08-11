import style from "./index.module.less";
import BaseModel from "../baseModel";
import personImg from "@/assets/person_img.png";
import { Rate } from "antd";
import { useTranslation } from "react-i18next";
import warn from '@/assets/warn.png'
import back_icon from '@/assets/back_icon.png'
import sureIcon from '@/assets/sure_icon.png'
import down_arrow from '@/assets/down_arrow.png'
import notIcon from '@/assets/notIcon.png'
import shouldIcon from '@/assets/shouldIcon.png'
import { useState } from 'react'
export default function HealthEvaluation({ comprehensiveAnalysis = {} }: any) {
  const { t } = useTranslation();
  const { liverScore = 0, heartScore = 0, spleenScore = 0, lungsScore = 0, renalScore = 0, comprehensiveDescription = '', healthRisk = '', comprehensive_result = [] , health_risk = [], condition_suggestion = {} } = comprehensiveAnalysis || {}

  // 记录展开的项的ID
    const [expandedItemIds, setExpandedItemIds] = useState<number[]>([]);

     // 打开详情
    const openDetail = (id: number) => {
        setExpandedItemIds(prev => {
            if (prev.includes(id)) {
                return prev.filter(item => item !== id);
            } else {
                return [...prev, id];
            }
        });
    }

    // 点击展开收起
    const suggestMore = () =>{
      setSuggestShow(!suggestShow)
    };
    // 数据排序
    const suggestArr = () => {
      const showArr = condition_suggestion?.scheme.map((item,index) =>{
        return {
          ...item,
          id: index
        }
      }) || [];
      if (showArr.length === 0) return [];

      const shouldArr = showArr.filter(item => item.type === '宜');
      const avoidArr = showArr.filter(item => item.type === '忌');

      if (suggestShow) {
        // 展开状态：展示全部，"宜"在前，"忌"在后
        return [...shouldArr, ...avoidArr];
      }

      // 收起状态：只展示两条（第一个"宜"和第一个"忌"）
      const result = [];
      if (shouldArr.length > 0) result.push(shouldArr[0]);
      if (avoidArr.length > 0) result.push(avoidArr[0]);
      return result;
    }
    // 下一步建议，展开收起
    const [suggestShow, setSuggestShow] = useState(false);

    // 记录打开的下一步建议的id

    const [suggestOpenId, setSuggestOpenId] = useState<number[]>([]);


    const suggestDetail = (id: number) => { 
      setSuggestOpenId(prev => {
        if (prev.includes(id)) {
            return prev.filter(item => item !== id);
        } else {
            return [...prev, id];
        }
    });
    }
  return (
    <>
      <BaseModel title={t('health_evaluation')}>
        <div className={style.starModel}>
          <div className={style.ring}>
            <div className={`${style.cycle} ${style.liverCycle}`}>
              <div className={`${style.star} ${style.customRate}`}>
                <Rate size="small" allowHalf disabled defaultValue={liverScore / 20 } />
              </div>
              <div>{t('liver')}</div>
              <div>{t('gallbladder')}</div>
            </div>
            <div className={`${style.cycle} ${style.kidneyCycle}`}>
              <div className={`${style.star} ${style.customRate}`}>
                <Rate size="small" allowHalf disabled defaultValue={renalScore / 20 } />
              </div>
              <div>{t('kidney')}</div>
              <div>{t('bladder')}</div>
            </div>
            <div className={`${style.cycle} ${style.lungCycle}`}>
              <div className={`${style.star} ${style.customRate}`}>
                <Rate size="small" allowHalf disabled defaultValue={lungsScore / 20 } />
              </div>
              <div>{t('lung')}</div>
              <div>{t('large_intestine')}</div>
            </div>
            <div className={`${style.cycle} ${style.spleenCycle}`}>
              <div className={`${style.star} ${style.customRate}`}>
                <Rate size="small" allowHalf disabled defaultValue={spleenScore / 20 } />
              </div>
              <div>{t('spleen')}</div>
              <div>{t('stomach')}</div>
            </div>
            <div className={`${style.cycle} ${style.heartCycle}`}>
              <div className={`${style.star} ${style.customRate}`}>
                <Rate size="small" allowHalf disabled defaultValue={heartScore / 20 } />
              </div>
              <div>{t('heart')}</div>
              <div>{t('small_intestine')}</div>
            </div>
            <div className={style.personImg}>
              <img src={personImg} alt="" />
            </div>
          </div>
        </div>
        <div className={style.bottomTitle}>{t('comprehensive_evaluation')} 
           &nbsp; &nbsp;<span className={style.levelText} style={ healthRisk == '健康' ? { color: '#7CD334'} : (healthRisk == '中风险'  || healthRisk == '轻微风险') ? { color:'#FAAD14'} : {color:'#FF4D4F'}}>{ healthRisk }</span>
        </div>
        <div className={style.resultDetail}>
            {comprehensive_result.length > 0 ? comprehensive_result.map((item, index) => (
                <div key={index} className={style.resultItem}>{item}</div>
            )) : <div className={style.noResult}>
                {t('compNoResult')}
            </div>}
        </div>
        <div className={style.bottomDetail}>{comprehensiveDescription}</div>
        <div className={style.riskResult}>
            <div className={style.riskTitle}>
                <div className={style.titleLeft}>
                    <div className={style.titleIcon}>
                        <img src={warn}></img>
                    </div>
                    <div>{t('compHealthRisk')} </div>
                </div>
            </div>
            {
                health_risk.map((item, index) => {
                    const isOpen = expandedItemIds.includes(item.id);
                    return (
                        <div className={style.riskDetail} key={index} onClick={() => { openDetail(item.id) }}>
                            <div className={style.tagDetail} style={isOpen ? {} : { display: 'flex', alignItems: 'center' }}>
                                <span className={style.tagType} style={isOpen ? { padding: '3px 10px' } : { padding: '3px 10px' }}>{item.risk_type}</span>
                                <span className={style.tagContent} style={isOpen ? {} : { whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', }}>
                                    {item.risk_detail}
                                </span>
                            </div>
                            <div className={style.tagArrow} style={isOpen ? { transform: 'rotate(-90deg)',marginTop: '10px' } : { transform: 'rotate(-180deg)', marginTop: '15px' }} >
                                <img src={back_icon} alt="arrow" />
                            </div>
                        </div>
                    )
                })
            }
        </div>
        <div className={style.organTip}>
            <div className={style.tipTitle}>
                <div className={style.tipTitleLeft}>
                  <div className={style.tipIcon}>
                    <img src={sureIcon} alt="" />
                  </div>
                  <div className={style.tipText}>{t('constNextStep')}</div>
                </div>
                <div className={style.moreIcon} onClick={suggestMore}>
                  <div>{suggestShow ? t('compCollapse') : t('compExpand')}</div>
                  <div className={style.downIcon} style={ suggestShow ? { transform: 'rotate(0deg)' } : { transform: 'rotate(-90deg)' }}>
                    <img src={down_arrow}/>
                  </div>
                </div>
            </div>
            <div className={style.tipSubTitle}>
                {condition_suggestion?.suggest || t('result.constNoSuggest')}
            </div>
            <div className={style.bottomSuggest}>
                { suggestArr().length > 0 && suggestArr().map((item,index) =>{
                  const suggestOpen = suggestOpenId.includes(item.id);
                  return (
                    <div className={style.suggestItem} key={index}>
                      <div className={style.detailTip} onClick={ () =>{ suggestDetail(item.id) }  }>
                          <div className={style.leftContent}>
                              <div className={style.detailTipTitle}>
                                  <div className={ item.type == '忌' ? style.typeIconNone : style.typeIcon}>
                                      <img src={ item.type == '忌' ? notIcon : shouldIcon} alt="" />
                                  </div>
                                  <div className={style.typeText} style={ suggestOpen ? { } : { whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis'}  }>
                                      {item.tag}
                                  </div>
                              </div>
                          </div>
                          <div className={style.detailArrow} style={suggestOpen ? { transform: 'rotate(-90deg)' } : { transform: 'rotate(-180deg)' }}>
                              <img src={back_icon} alt="arrow" />
                          </div>
                      </div>
                      <div className={style.contentText} style={ suggestOpen ? {} : {whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis'}}>{item.content}</div>
                    </div>
                  )
                })}
            </div>
        </div>
      </BaseModel>
    </>
  );
}
