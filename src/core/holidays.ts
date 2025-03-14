/**
 * Holiday Management Module
 *
 * This module provides functions for working with Kurdish holidays and events.
 */

import { Holiday, HolidayOptions } from '../types';
import { isSameDay } from './date-utils';

// Set of hardcoded holidays for testing and as a fallback
const HOLIDAYS: Holiday[] = [
  {
    date: '2025-01-01',
    event: {
      en: 'New Year\'s Day',
      ku: 'ڕۆژی سەری ساڵی نوێ',
      ar: 'رأس السنة الميلادية',
      fa: 'روز سال نو',
    },
    note: {
      en: '',
      ku: '',
      ar: '',
      fa: '',
    },
    quote: {
      celebrity: 'Jalal Talabani',
      quote: {
        en: 'The strength of our people lies in our unity and hope.',
        ku: 'هێزی خەڵکی ئێمە لە یەکگرتوویدا و هیواماندا دێت.',
        fa: 'قدرت مردم ما در اتحاد و امید ماست.',
        ar: 'قوة شعبنا تكمن في وحدتنا وأملنا.',
      },
    },
  },
  {
    date: '2025-03-05',
    event: {
      en: 'Uprising Day (against Saddam Hussein\'s regime)',
      ku: 'ڕۆژی ڕاپەڕین (دژی ڕژێمی سەدام حوسێن)',
      ar: 'يوم الانتفاضة (ضد نظام صدام حسين)',
      fa: 'روز قیام (علیه رژیم صدام حسین)',
    },
    note: {
      en: '',
      ku: '',
      ar: '',
      fa: '',
    },
    quote: {
      celebrity: 'Masoud Barzani',
      quote: {
        en: 'Struggle is the path to freedom, and our spirit is unbreakable.',
        ku: 'شەڕ هەنگاوێکی ئازادیە، و رووحمان نەشکنینەوە.',
        fa: 'مبارزه راه آزادی است، و روح ما شکست‌ناپذیر است.',
        ar: 'الكفاح طريق للحرية، وروحنا لا تُقهَر.',
      },
    },
  },
  {
    date: '2025-03-10',
    event: {
      en: 'National Kurdish Clothing Day',
      ku: 'ڕۆژی نیشتمانی جلوبەرگی کوردی',
      ar: 'اليوم الوطني للزي الكردي',
      fa: 'روز جهانی پوشش کردی',
    },
    note: {
      en: '',
      ku: '',
      ar: '',
      fa: '',
    },
    quote: {
      celebrity: 'Kurdistan',
      quote: {
        en: 'Every thread of our traditional Kurdish attire weaves the tale of our proud heritage, echoing the voices of our ancestors.',
        ku: 'هەموو تیشکی جلوبەرگی کوردیی کۆنەکانمان چیرۆکی میراثی سەربەخۆی ئێمە دەخەینێت، دەنگی پێشینەکانمان بڵاوی دەکات.',
        fa: 'هر نخ از پوشاک سنتی کردستان، داستان میراث پرافتخار ما را می‌بافد و پژواک صدای نیاکان ماست.',
        ar: 'كل خيط من ملابسنا الكردية التقليدية ينسج قصة تراثنا الفخور، معبراً عن أصوات أجدادنا.',
      },
    },
  },
  {
    date: '2025-03-11',
    event: {
      en: 'Anniversary of 11 March Agreement (1970)',
      ku: 'ساڵیادی ڕێکەوتننامەی ١١ ی ئازار (١٩٧٠)',
      ar: 'ذكرى اتفاقية 11 آذار (1970)',
      fa: 'سالگرد توافقنامه ۱۱ مارس (۱۹۷۰)',
    },
    note: {
      en: '',
      ku: '',
      ar: '',
      fa: '',
    },
    quote: {
      celebrity: 'Jalal Talabani',
      quote: {
        en: 'Dialogue and understanding build the bridges to our future.',
        ku: 'ڕێکەوت و تێگەیشتن پلەکانمان بۆ داهاتی ئێمە دروست دەکەن.',
        fa: 'گفتگو و تفاهم پل‌های آینده ما را می‌سازد.',
        ar: 'الحوار والتفاهم يبنيان جسور مستقبلنا.',
      },
    },
  },
  {
    date: '2025-03-11',
    event: {
      en: 'Liberation of Erbil (Hawler) City',
      ku: 'ڕزگارکردنی شارەکەی هەولێر',
      ar: 'تحرير مدينة أربيل (هولير)',
      fa: 'آزادسازی شهر اربیل (هولیر)',
    },
    note: {
      en: '',
      ku: '',
      ar: '',
      fa: '',
    },
    quote: {
      celebrity: '',
      quote: {
        en: '',
        ku: '',
        fa: '',
        ar: '',
      },
    },
  },
  {
    date: '2025-03-14',
    event: {
      en: 'Birthday of Mala Mustafa Barzani',
      ku: 'ڕۆژی لە دایکبوونی ملا مستەفا بارزانی',
      ar: 'ذكرى ميلاد ملا مصطفى بارزاني',
      fa: 'سالروز تولد ملا مصطفی بارزانی',
    },
    note: {
      en: '',
      ku: '',
      ar: '',
      fa: '',
    },
    quote: {
      celebrity: 'Masoud Barzani',
      quote: {
        en: 'Our history is written with the ink of sacrifice and courage.',
        ku: 'مێژووی ئێمە بە سیاڵی فداکاری و دلیری نوسراوە.',
        fa: 'تاریخ ما با جوهر فداکاری و شجاعت نوشته شده است.',
        ar: 'تاريخنا مكتوب بحبر التضحية والشجاعة.',
      },
    },
  },
  {
    date: '2025-03-14',
    event: {
      en: 'Liberation of Duhok City',
      ku: 'ڕزگارکردنی شارەکەی دهوک',
      ar: 'تحرير مدينة دهوك',
      fa: 'آزادسازی شهر دهوک',
    },
    note: {
      en: '',
      ku: '',
      ar: '',
      fa: '',
    },
    quote: {
      celebrity: '',
      quote: {
        en: '',
        ku: '',
        fa: '',
        ar: '',
      },
    },
  },
  {
    date: '2025-03-16',
    event: {
      en: 'Halabja Day',
      ku: 'Rojê Halabja',
      ar: 'يوم حلبجة',
      fa: 'روز حلبجه',
    },
    note: {
      en: 'Commemoration of the chemical weapons bombardment on the city of Halabja',
      ku: 'یادکردنی تەقەدانی سلاحە کیمیاویەکان لە شارەکەی حلبجة',
      ar: 'إحياء ذكرى القصف بالأسلحة الكيميائية على مدينة حلبجة',
      fa: 'یادبود بمباران با سلاح‌های شیمیایی در شهر حلبجه',
    },
    quote: {
      celebrity: '',
      quote: {
        en: '',
        ku: '',
        fa: '',
        ar: '',
      },
    },
  },
  {
    date: '2025-03-21',
    event: {
      en: 'Liberation of Kirkuk City',
      ku: 'ڕزگارکردنی شارەکەی کرکوک',
      ar: 'تحرير مدينة كركوك',
      fa: 'آزادسازی شهر کرکوک',
    },
    note: {
      en: '',
      ku: '',
      ar: '',
      fa: '',
    },
    quote: {
      celebrity: '',
      quote: {
        en: '',
        ku: '',
        fa: '',
        ar: '',
      },
    },
  },
  {
    date: '2025-03-21',
    event: {
      en: 'Nawroz Kurdish New Year',
      ku: 'نەورۆز، ساڵی نوێی کوردی',
      ar: 'نوروز، السنة الكردية الجديدة',
      fa: 'نوروز، سال نو کردی',
    },
    note: {
      en: 'Traditional celebration of spring and new year',
      ku: 'جەژنی بەهار و ساڵی نوێ',
      ar: 'احتفال تقليدي بالربيع والسنة الجديدة',
      fa: 'جشن سنتی بهار و سال نو',
    },
    quote: {
      celebrity: 'Sherko Bekas',
      quote: {
        en: 'In every dawn, there is a promise of renewal.',
        ku: 'لە هەموو سپیدانێکدا، پێشوازی تازەبوون هەیە.',
        fa: 'در هر سپیده‌دم، وعده‌ای برای تجدید وجود دارد.',
        ar: 'في كل فجر، هناك وعد بالتجدد.',
      },
    },
  },
  {
    date: '2025-03-30',
    event: {
      en: 'Eid-al-Fitr (End of Ramadan)',
      ku: 'جەژنی ڕەمەزان (کۆتایی مانگی ڕەمەزان)',
      ar: 'عيد الفطر (نهاية شهر رمضان)',
      fa: 'عید فطر (پایان ماه رمضان)',
    },
    note: {
      en: 'Estimated date, subject to moon sighting',
      ku: 'ڕێکەوتی خەمڵێندراو، بەپێی بینینی مانگ دەگۆڕێت',
      ar: 'تاريخ تقديري، يخضع لرؤية الهلال',
      fa: 'تاریخ تخمینی، تابع رؤیت هلال ماه',
    },
    quote: {
      celebrity: 'Sherko Bekas',
      quote: {
        en: 'The end of fasting marks the beginning of joy and unity.',
        ku: 'کۆتایی ڕەمەزان سەرەتای شادمانی و یەکگرتنە.',
        fa: 'پایان روزه آغاز شادی و وحدت است.',
        ar: 'نهاية الصوم تمثل بداية الفرح والوحدة.',
      },
    },
  },
  {
    date: '2024-03-21',
    event: {
      en: 'Nawroz - Kurdish New Year',
      ku: 'نەورۆز - سەری ساڵی کوردی',
      ar: 'نوروز - رأس السنة الكردية',
      fa: 'نوروز - سال نو کردی',
    },
    note: {
      en: 'Traditional celebration of spring and new year',
      ku: 'جەژنی بەهار و ساڵی نوێ',
      ar: 'احتفال تقليدي بالربيع والسنة الجديدة',
      fa: 'جشن سنتی بهار و سال نو',
    },
    quote: {
      celebrity: 'Sherko Bekas',
      quote: {
        en: 'Nawroz is a celebration of our enduring spirit and heritage.',
        ku: 'نەورۆز جەژنی هەستی ماندوو و میراثمانە.',
        fa: 'نوروز جشن روح و میراث پایدار ماست.',
        ar: 'نوروز احتفال بروحنا وإرثنا الدائم.',
      },
    },
  },
  {
    date: '2024-12-10',
    event: {
      en: 'Kurdish Flag Day',
      ku: 'ڕۆژی ئاڵای کوردستان',
      ar: 'يوم العلم الكردي',
      fa: 'روز پرچم کردستان',
    },
    quote: {
      celebrity: 'Jalal Talabani',
      quote: {
        en: 'Our flag symbolizes the courage and unity of our people.',
        ku: 'ئاڵای ئێمە نیشانی دلیری و یەکگرتنی خەڵکەکانمانە.',
        fa: 'پرچم ما نماد شجاعت و وحدت مردم ماست.',
        ar: 'علمنا يرمز إلى شجاعة ووحدة شعبنا.',
      },
    },
  },
  {
    date: '2025-03-31',
    event: {
      en: 'Eid-al-Fitr (End of Ramadan)',
      ku: 'جەژنی ڕەمەزان (کۆتایی مانگی ڕەمەزان)',
      ar: 'عيد الفطر (نهاية شهر رمضان)',
      fa: 'عید فطر (پایان ماه رمضان)',
    },
    note: {
      en: 'Estimated date, subject to moon sighting',
      ku: 'ڕێکەوتی خەمڵێندراو، بەپێی بینینی مانگ دەگۆڕێت',
      ar: 'تاريخ تقديري، يخضع لرؤية الهلال',
      fa: 'تاریخ تخمینی، تابع رؤیت هلال ماه',
    },
    quote: {
      celebrity: 'Masoud Barzani',
      quote: {
        en: 'In the spirit of Eid, hearts are united in celebration.',
        ku: 'لە ڕوحی عیددا، دڵەکان لە جەژن یەکدیکرن.',
        fa: 'در روح عید، دل‌ها در جشن متحد می‌شوند.',
        ar: 'في روح العيد، تتحد القلوب في الاحتفال.',
      },
    },
  },
  {
    date: '2025-04-01',
    event: {
      en: 'Assyrian New Year',
      ku: 'ساڵی نوێی ئاشووری',
      ar: 'رأس السنة الآشورية',
      fa: 'سال نو آشوری',
    },
    note: {
      en: '',
      ku: '',
      ar: '',
      fa: '',
    },
    quote: {
      celebrity: 'Jalal Talabani',
      quote: {
        en: 'Unity in diversity makes our future brighter.',
        ku: 'یەکگرتوو لە جیاوازییەکاندا داهاتی ئیشقەوەرمان بەڕوون دەکات.',
        fa: 'وحدت در تنوع، آینده ما را روشن‌تر می‌کند.',
        ar: 'الوحدة في التنوع تجعل مستقبلنا أكثر إشراقًا.',
      },
    },
  },
  {
    date: '2025-04-01',
    event: {
      en: 'Eid-al-Fitr (End of Ramadan)',
      ku: 'جەژنی ڕەمەزان (کۆتایی مانگی ڕەمەزان)',
      ar: 'عيد الفطر (نهاية شهر رمضان)',
      fa: 'عید فطر (پایان ماه رمضان)',
    },
    note: {
      en: 'Estimated date, subject to moon sighting',
      ku: 'ڕێکەوتی خەمڵێندراو، بەپێی بینینی مانگ دەگۆڕێت',
      ar: 'تاريخ تقديري، يخضع لرؤية الهلال',
      fa: 'تاریخ تخمینی، تابع رؤیت هلال ماه',
    },
    quote: {
      celebrity: 'Jalal Talabani',
      quote: {
        en: 'May the blessings of Eid fill our lives with hope and unity.',
        ku: 'خوا برکەکانی عید ژیانمان پڕ بکەن لە هیوامان و یەکگرتن.',
        fa: 'باشد که برکت عید زندگی ما را پر از امید و وحدت کند.',
        ar: 'ليملأ بركة العيد حياتنا بالأمل والوحدة.',
      },
    },
  },
  {
    date: '2025-04-02',
    event: {
      en: 'Eid-al-Fitr (End of Ramadan)',
      ku: 'جەژنی ڕەمەزان (کۆتایی مانگی ڕەمەزان)',
      ar: 'عيد الفطر (نهاية شهر رمضان)',
      fa: 'عید فطر (پایان ماه رمضان)',
    },
    note: {
      en: 'Estimated date, subject to moon sighting',
      ku: 'ڕێکەوتی خەمڵێندراو، بەپێی بینینی مانگ دەگۆڕێت',
      ar: 'تاريخ تقديري، يخضع لرؤية الهلال',
      fa: 'تاریخ تخمینی، تابع رؤیت هلال ماه',
    },
    quote: {
      celebrity: 'Masoud Barzani',
      quote: {
        en: 'Let the spirit of Eid bring peace and prosperity to all.',
        ku: 'بێت ڕوحی عید ئاشتی و سەروەری بۆ هەموومان بهێنێت.',
        fa: 'بگذارید روح عید صلح و رفاه را به همه بیاورد.',
        ar: 'دع روح العيد يجلب السلام والازدهار للجميع.',
      },
    },
  },
  {
    date: '2025-04-09',
    event: {
      en: 'Baghdad Liberation Day (fall of Saddam Hussein\'s regime)',
      ku: 'ڕۆژی ئازادكردنی بەغدا (ڕووخانی ڕژێمی سەدام حوسێن)',
      ar: 'يوم تحرير بغداد (سقوط نظام صدام حسين)',
      fa: 'روز آزادی بغداد (سقوط رژیم صدام حسین)',
    },
    note: {
      en: '',
      ku: '',
      ar: '',
      fa: '',
    },
    quote: {
      celebrity: 'Masoud Barzani',
      quote: {
        en: 'Freedom is the birthright of every human being.',
        ku: 'ئازادی حقی خاوەنەتی هەموو مرۆڤێکە.',
        fa: 'آزادی حق هر انسانی است.',
        ar: 'الحرية حق فطري لكل إنسان.',
      },
    },
  },
  {
    date: '2025-04-16',
    event: {
      en: 'Yazidi New Year (Charshema Sor)',
      ku: 'ساڵی نوێی ئێزیدی (چوارشەمە سوور)',
      ar: 'السنة الأيزيدية الجديدة (جارشيما سور)',
      fa: 'سال نو ایزدی (چارشما سور)',
    },
    note: {
      en: 'First Wednesday after April 13 (Yazidi tradition)',
      ku: 'یەکەم چوارشەممە دوای ١٣ی نیسان (داب و نەریتی ئێزیدی)',
      ar: 'أول أربعاء بعد 13 أبريل (تقليد أيزيدي)',
      fa: 'اولین چهارشنبه بعد از ۱۳ آوریل (سنت ایزدی)',
    },
    quote: {
      celebrity: 'Sherko Bekas',
      quote: {
        en: 'New beginnings are the poetry of life.',
        ku: 'دەستپێکردنی نوێ شاعری ژیانە.',
        fa: 'آغازهای نو، شعر زندگی هستند.',
        ar: 'البدايات الجديدة هي شعر الحياة.',
      },
    },
  },
  {
    date: '2025-04-16',
    event: {
      en: 'Commemoration of Chemical attack on Balisan',
      ku: 'یادکردنی تێکدانی کیمیاوی سەر بالیسان',
      ar: 'إحياء ذكرى الهجوم الكيميائي على باليسان',
      fa: 'یادبود حمله شیمیایی به بالیسان',
    },
    note: {
      en: 'Commemoration of the chemical attack on Balisan, honoring the memory of those affected.',
      ku: 'یادکردنی تێکدانی کیمیاوی سەر بالیسان، بەردەوامکردنی بیرەوەری ئەوانی زیانپێگەیاند.',
      ar: 'إحياء ذكرى الهجوم الكيميائي على باليسان، وتكريم ذكرى المتضررين.',
      fa: 'یادبود حمله شیمیایی به بالیسان، بزرگداشت یاد و خاطره‌ی آسیب‌دیدگان.',
    },
    quote: {
      celebrity: '',
      quote: {
        en: '',
        ku: '',
        fa: '',
        ar: '',
      },
    },
  },
  {
    date: '2025-04-22',
    event: {
      en: 'Kurdish Journalism Day',
      ku: 'ڕۆژنامەگەری کوردی',
      ar: 'يوم الصحافة الكردية',
      fa: 'روز روزنامه‌نگاری کردی',
    },
    note: {
      en: '',
      ku: '',
      ar: '',
      fa: '',
    },
    quote: {
      celebrity: '',
      quote: {
        en: '',
        ku: '',
        fa: '',
        ar: '',
      },
    },
  },
  {
    date: '2025-05-01',
    event: {
      en: 'International Labour Day',
      ku: 'ڕۆژی نێودەوڵەتی کرێکاران',
      ar: 'يوم العمال العالمي',
      fa: 'روز جهانی کارگر',
    },
    note: {
      en: '',
      ku: '',
      ar: '',
      fa: '',
    },
    quote: {
      celebrity: 'Jalal Talabani',
      quote: {
        en: 'Work is the foundation of our progress and dignity.',
        ku: 'کار بنای پێشڕۆکی و پەرستنی ئێمەیە.',
        fa: 'کار بنیان پیشرفت و کرامت ماست.',
        ar: 'العمل هو أساس تقدمنا وكرامتنا.',
      },
    },
  },
  {
    date: '2025-06-06',
    event: {
      en: 'Eid al-Qurban',
      ku: 'جەژنی قوربان',
      ar: 'عيد الأضحى',
      fa: 'عید قربان',
    },
    note: {
      en: 'Estimated date, subject to moon sighting',
      ku: 'ڕێکەوتی خەمڵێندراو، بەپێی بینینی مانگ دەگۆڕێت',
      ar: 'تاريخ تقديري، يخضع لرؤية الهلال',
      fa: 'تاریخ تخمینی، تابع رؤیت هلال ماه',
    },
    quote: {
      celebrity: 'Masoud Barzani',
      quote: {
        en: 'Sacrifice is the essence of our faith and strength.',
        ku: 'فداکاری جوهری ئیمانی و هێزی ئێمەیە.',
        fa: 'فداکاری جوهر ایمان و قدرت ماست.',
        ar: 'التضحية هي جوهر إيماننا وقوتنا.',
      },
    },
  },
  {
    date: '2024-03-16',
    event: {
      en: 'Halabja Memorial Day',
      ku: 'یادی کیمیابارانی هەڵەبجە',
      ar: 'ذكرى حلبجة',
      fa: 'یادبود حلبجه',
    },
    quote: {
      celebrity: 'Masoud Barzani',
      quote: {
        en: 'We remember Halabja to honor the sacrifice of our martyrs.',
        ku: 'بیر لە هەڵەبجە دەکەین بۆ سەرفرازی فداکاری شهیدەکانمان.',
        fa: 'ما هلالبجا را به یاد می‌آوریم تا فداکاری شهدایمان را تجلیل کنیم.',
        ar: 'نحن نذكر حلبجة لتكريم تضحيات شهدائنا.',
      },
    },
  },
  {
    date: '2024-03-14',
    event: {
      en: 'Kurdish Clothing Day',
      ku: 'ڕۆژی جلوبەرگی کوردی',
      ar: 'يوم الملابس الكردية',
      fa: 'روز لباس کردی',
    },
    quote: {
      celebrity: 'Sherko Bekas',
      quote: {
        en: 'Traditional attire is the fabric of our cultural identity.',
        ku: 'جلوبەرگی کۆن ڕووسای نیشانی کلتوری ئێمەیە.',
        fa: 'لباس سنتی، پارچه هویت فرهنگی ماست.',
        ar: 'الزي التقليدي هو نسيج هويتنا الثقافية.',
      },
    },
  },
  {
    date: '2024-03-05',
    event: {
      en: 'Kurdish Uprising Day',
      ku: 'ڕۆژی ڕاپەڕینی کوردستان',
      ar: 'يوم الانتفاضة الكردية',
      fa: 'روز قیام کردستان',
    },
    note: {
      en: 'Anniversary of the 1991 Kurdish uprising',
      ku: 'ساڵیادی ڕاپەڕینی ١٩٩١ی کوردستان',
      ar: 'ذكرى الانتفاضة الكردية عام 1991',
      fa: 'سالگرد قیام کردستان در سال 1991',
    },
    quote: {
      celebrity: 'Jalal Talabani',
      quote: {
        en: 'The spirit of uprising lives in every Kurdish heart.',
        ku: 'ڕوحی ڕاپەڕین لە هەموو دڵی کوردەکان دەژی.',
        fa: 'روح قیام در هر دل کرد وجود دارد.',
        ar: 'روح الانتفاضة تعيش في كل قلب كردي.',
      },
    },
  },
  {
    date: '2024-08-15',
    event: {
      en: 'Mahabad Republic Day',
      ku: 'ڕۆژی کۆماری مەهاباد',
      ar: 'يوم جمهورية مهاباد',
      fa: 'روز جمهوری مهاباد',
    },
    quote: {
      celebrity: 'Masoud Barzani',
      quote: {
        en: 'Mahabad reminds us that freedom is the path to true democracy.',
        ku: 'مەهاباد بۆمان بەردەوامی ئازادی و دیموکراسی ڕوون دەکات.',
        fa: 'مهاباد به ما یادآوری می‌کند که آزادی راه دموکراسی واقعی است.',
        ar: 'مهاباد تذكرنا بأن الحرية هي الطريق إلى الديمقراطية الحقيقية.',
      },
    },
  },
  {
    date: '2024-01-22',
    event: {
      en: 'Kurdistan Parliament Day',
      ku: 'ڕۆژی پەرلەمانی کوردستان',
      ar: 'يوم البرلمان الكردستاني',
      fa: 'روز پارلمان کردستان',
    },
    quote: {
      celebrity: 'Jalal Talabani',
      quote: {
        en: 'Our parliament is the voice of the people, echoing justice and hope.',
        ku: 'پەرلەمانمان دەنگی خەڵکە، بە ئاوازێکی داد و هیوامان دەنگ دەدات.',
        fa: 'پارلمان ما صدای مردم است که عدالت و امید را بازتاب می‌دهد.',
        ar: 'برلماننا هو صوت الشعب، يعكس العدالة والأمل.',
      },
    },
  },
  {
    date: '2024-05-27',
    event: {
      en: 'Kurdish Film Day',
      ku: 'ڕۆژی فیلمی کوردی',
      ar: 'يوم الفيلم الكردي',
      fa: 'روز فیلم کردی',
    },
    note: {
      en: 'Celebrating Kurdish cinema and filmmakers',
      ku: 'یادکردنەوەی سینەمای کوردی و فیلمسازان',
      ar: 'الاحتفال بالسينما الكردية وصانعي الأفلام',
      fa: 'گرامیداشت سینمای کردی و فیلمسازان',
    },
    quote: {
      celebrity: 'Sherko Bekas',
      quote: {
        en: 'Cinema is our collective memory, preserving our stories for future generations.',
        ku: 'سینەما بیرەوەری کۆی ئێمەیە، بۆ نەوەکانی داهاتوو پاراستنی چیرۆکەکانمان.',
        fa: 'سینما حافظه جمعی ماست که داستان‌هایمان را برای نسل‌های آینده حفظ می‌کند.',
        ar: 'السينما هي ذاكرتنا الجماعية، تحفظ قصصنا للأجيال القادمة.',
      },
    },
  },
  {
    date: '2024-06-12',
    event: {
      en: 'Eid-al-Adha (Feast of Sacrifice)',
      ku: 'جەژنی قوربان',
      ar: 'عيد الأضحى',
      fa: 'عید قربان',
    },
    note: {
      en: 'Estimated date, subject to moon sighting',
      ku: 'ڕێکەوتی خەمڵێندراو، بەپێی بینینی مانگ دەگۆڕێت',
      ar: 'تاريخ تقديري، يخضع لرؤية الهلال',
      fa: 'تاریخ تخمینی، تابع رؤیت هلال ماه',
    },
    quote: {
      celebrity: 'Masoud Barzani',
      quote: {
        en: 'In sacrifice, we find our strength and unity.',
        ku: 'لە قوربانیدا، هێزی و یەکگرتنمان ئەدۆزینەوە.',
        fa: 'در قربانی، قدرت و وحدت خود را می‌یابیم.',
        ar: 'في التضحية، نجد قوتنا ووحدتنا.',
      },
    },
  },
  {
    date: '2024-06-13',
    event: {
      en: 'Eid-al-Adha (Day 2)',
      ku: 'جەژنی قوربان (ڕۆژی ٢)',
      ar: 'عيد الأضحى (اليوم 2)',
      fa: 'عید قربان (روز ۲)',
    },
    note: {
      en: 'Estimated date, subject to moon sighting',
      ku: 'ڕێکەوتی خەمڵێندراو، بەپێی بینینی مانگ دەگۆڕێت',
      ar: 'تاريخ تقديري، يخضع لرؤية الهلال',
      fa: 'تاریخ تخمینی، تابع رؤیت هلال ماه',
    },
    quote: {
      celebrity: 'Jalal Talabani',
      quote: {
        en: 'The bonds we forge during these celebrations last a lifetime.',
        ku: 'ئەو پەیوەندییانەی لە کاتی ئەم جەژنانە دروست دەکەین بۆ هەموو تەمەن دەمێنن.',
        fa: 'پیوندهایی که در این جشن‌ها ایجاد می‌کنیم، یک عمر دوام می‌آورند.',
        ar: 'الروابط التي نصنعها خلال هذه الاحتفالات تدوم مدى الحياة.',
      },
    },
  },
  {
    date: '2024-06-14',
    event: {
      en: 'Eid-al-Adha (Day 3)',
      ku: 'جەژنی قوربان (ڕۆژی ٣)',
      ar: 'عيد الأضحى (اليوم 3)',
      fa: 'عید قربان (روز ۳)',
    },
    note: {
      en: 'Estimated date, subject to moon sighting',
      ku: 'ڕێکەوتی خەمڵێندراو، بەپێی بینینی مانگ دەگۆڕێت',
      ar: 'تاريخ تقديري، يخضع لرؤية الهلال',
      fa: 'تاریخ تخمینی، تابع رؤیت هلال ماه',
    },
    quote: {
      celebrity: 'Sherko Bekas',
      quote: {
        en: 'Each celebration renews our spirit and culture.',
        ku: 'هەر جەژنێک ڕۆح و کلتوری ئێمە نوێ دەکاتەوە.',
        fa: 'هر جشن، روح و فرهنگ ما را تازه می‌کند.',
        ar: 'كل احتفال يجدد روحنا وثقافتنا.',
      },
    },
  },
  {
    date: '2024-07-25',
    event: {
      en: 'Kurdish Culture Day',
      ku: 'ڕۆژی کلتووری کوردی',
      ar: 'يوم الثقافة الكردية',
      fa: 'روز فرهنگ کردی',
    },
    quote: {
      celebrity: 'Sherko Bekas',
      quote: {
        en: 'Our culture is the heart that beats in every Kurdish soul.',
        ku: 'کلتوری ئێمە دڵە کە لە هەموو گیانێکی کوردی لێدەدات.',
        fa: 'فرهنگ ما قلبی است که در هر روح کردی می‌تپد.',
        ar: 'ثقافتنا هي القلب الذي ينبض في كل روح كردية.',
      },
    },
  },
  {
    date: '2024-11-10',
    event: {
      en: 'Kurdish Language Day',
      ku: 'ڕۆژی زمانی کوردی',
      ar: 'يوم اللغة الكردية',
      fa: 'روز زبان کردی',
    },
    quote: {
      celebrity: 'Masoud Barzani',
      quote: {
        en: 'Our language is the guardian of our identity through generations.',
        ku: 'زمانی ئێمە پارێزەری ناسنامەی ئێمەیە لە نەوە بۆ نەوە.',
        fa: 'زبان ما نگهبان هویت ما در طول نسل‌هاست.',
        ar: 'لغتنا هي حارس هويتنا عبر الأجيال.',
      },
    },
  },
  {
    date: '2024-12-10',
    event: {
      en: 'Yalda Night (Winter Solstice)',
      ku: 'شەوی یەڵدا (چلەی زستان)',
      ar: 'ليلة يلدا (الانقلاب الشتوي)',
      fa: 'شب یلدا (انقلاب زمستانی)',
    },
    note: {
      en: 'Ancient Kurdish-Persian festival celebrating the longest night of the year',
      ku: 'جەژنی دێرینی کوردی-فارسی بۆ درێژترین شەوی ساڵ',
      ar: 'مهرجان كردي فارسي قديم يحتفل بأطول ليلة في السنة',
      fa: 'جشن باستانی کردی-فارسی بلندترین شب سال',
    },
    quote: {
      celebrity: 'Sherko Bekas',
      quote: {
        en: 'Even in the longest night, we find light in our togetherness.',
        ku: 'تەنانەت لە درێژترین شەودا، لە پێکەوەبوونماندا ڕووناکی دەدۆزینەوە.',
        fa: 'حتی در طولانی‌ترین شب، در کنار هم بودن نور را می‌یابیم.',
        ar: 'حتى في أطول ليلة، نجد النور في تواجدنا معًا.',
      },
    },
  },
  {
    date: '2024-12-25',
    event: {
      en: 'Christmas',
      ku: 'کریسمس',
      ar: 'عيد الميلاد',
      fa: 'کریسمس',
    },
    quote: {
      celebrity: 'Jalal Talabani',
      quote: {
        en: 'All celebrations of faith bring us closer as a diverse nation.',
        ku: 'هەموو جەژنەکانی ئیمان وەک نەتەوەیەکی فرەچەشن نزیکترمان دەکاتەوە.',
        fa: 'همه جشن‌های ایمانی ما را به عنوان یک ملت متنوع نزدیک‌تر می‌کند.',
        ar: 'كل احتفالات الإيمان تقربنا كأمة متنوعة.',
      },
    },
  },
];

/**
 * Gets all holidays from the dataset
 *
 * @returns Array of all holidays
 */
export function getAllHolidays(): Holiday[] {
  // For simplicity in testing, return the hardcoded holidays
  return HOLIDAYS;
}

/**
 * Gets holidays for a specific date
 *
 * @param date - The date to check for holidays
 * @param options - Optional filtering options
 * @returns Array of holidays for the specified date
 */
export function getHolidaysForDate(
  date: Date,
  options?: HolidayOptions,
): Holiday[] {
  const holidays = getAllHolidays();

  return holidays.filter((holiday) => {
    const holidayDate = new Date(holiday.date);

    // Check if the date matches
    if (!isSameDay(holidayDate, date)) {
      return false;
    }

    // If country filter is provided, check if the holiday is for that country
    if (
      options?.country &&
      holiday.country &&
      holiday.country !== options.country
    ) {
      return false;
    }

    // If region filter is provided, check if the holiday is for that region
    if (
      options?.region &&
      holiday.region &&
      holiday.region !== options.region
    ) {
      return false;
    }

    return true;
  });
}

/**
 * Gets holidays for a specific month
 *
 * @param year - Year
 * @param month - Month (0-11, JavaScript style)
 * @param options - Optional filtering options
 * @returns Array of holidays for the specified month
 */
export function getHolidaysForMonth(
  year: number,
  month: number,
  options?: HolidayOptions,
): Holiday[] {
  const holidays = getAllHolidays();

  return holidays.filter((holiday) => {
    const holidayDate = new Date(holiday.date);

    // Check if the month and year match
    if (
      holidayDate.getFullYear() !== year ||
      holidayDate.getMonth() !== month
    ) {
      return false;
    }

    // If country filter is provided, check if the holiday is for that country
    if (
      options?.country &&
      holiday.country &&
      holiday.country !== options.country
    ) {
      return false;
    }

    // If region filter is provided, check if the holiday is for that region
    if (
      options?.region &&
      holiday.region &&
      holiday.region !== options.region
    ) {
      return false;
    }

    return true;
  });
}

/**
 * Gets holidays between two dates (inclusive)
 *
 * @param startDate - Start date
 * @param endDate - End date
 * @param options - Optional filtering options
 * @returns Array of holidays between the specified dates
 */
export function getHolidaysBetweenDates(
  startDate: Date,
  endDate: Date,
  options?: HolidayOptions,
): Holiday[] {
  const holidays = getAllHolidays();

  return holidays.filter((holiday) => {
    const holidayDate = new Date(holiday.date);

    // Check if the date is within range
    if (holidayDate < startDate || holidayDate > endDate) {
      return false;
    }

    // If country filter is provided, check if the holiday is for that country
    if (
      options?.country &&
      holiday.country &&
      holiday.country !== options.country
    ) {
      return false;
    }

    // If region filter is provided, check if the holiday is for that region
    if (
      options?.region &&
      holiday.region &&
      holiday.region !== options.region
    ) {
      return false;
    }

    return true;
  });
}

/**
 * Gets upcoming holidays from a given date
 *
 * @param date - Starting date
 * @param count - Number of upcoming holidays to return
 * @param options - Optional filtering options
 * @returns Array of upcoming holidays
 */
export function getUpcomingHolidays(
  date: Date,
  count: number = 5,
  options?: HolidayOptions,
): Holiday[] {
  const holidays = getAllHolidays();

  // Filter holidays that are in the future
  const futureHolidays = holidays.filter((holiday) => {
    const holidayDate = new Date(holiday.date);

    // Check if the date is in the future
    if (holidayDate < date) {
      return false;
    }

    // If country filter is provided, check if the holiday is for that country
    if (
      options?.country &&
      holiday.country &&
      holiday.country !== options.country
    ) {
      return false;
    }

    // If region filter is provided, check if the holiday is for that region
    if (
      options?.region &&
      holiday.region &&
      holiday.region !== options.region
    ) {
      return false;
    }

    return true;
  });

  // Sort by date (ascending)
  futureHolidays.sort((a, b) => {
    return new Date(a.date).getTime() - new Date(b.date).getTime();
  });

  // Return requested number of holidays
  return futureHolidays.slice(0, count);
}

/**
 * Gets the next holiday from a given date
 *
 * @param date - Starting date
 * @param options - Optional filtering options
 * @returns The next holiday or null if none found
 */
export function getNextHoliday(
  date: Date,
  options?: HolidayOptions,
): Holiday | null {
  const upcomingHolidays = getUpcomingHolidays(date, 1, options);
  return upcomingHolidays.length > 0 ? upcomingHolidays[0] : null;
}

/**
 * Checks if a specific date is a holiday
 *
 * @param date - Date to check
 * @param options - Optional filtering options
 * @returns True if the date is a holiday
 */
export function isHoliday(date: Date, options?: HolidayOptions): boolean {
  return getHolidaysForDate(date, options).length > 0;
}

/**
 * Gets translated text based on the specified language
 *
 * @param textObj - The multi-language text object
 * @param language - Desired language ('en', 'ku', 'ar', or 'fa')
 * @param defaultText - Default text if the language is not available
 * @returns The translated text or default text if not available
 */
export function getLocalizedText(
  textObj: { [key: string]: string } | undefined,
  language: string = 'en',
  defaultText: string = '',
): string {
  if (!textObj) {
    return defaultText;
  }

  return textObj[language] || textObj.en || defaultText;
}
