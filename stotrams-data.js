const STOTRAMS = [
  {
    id: 'shiv-tandav',
    name: 'Shiv Tandav Stotram',
    nameDevanagari: 'शिवताण्डवस्तोत्रम्',
    author: 'Ravana',
    verseCount: 17,
    verses: [
      {
        lines: ['जटाटवीगलज्जलप्रवाहपावितस्थले','गलेऽवलम्ब्य लम्बितां भुजङ्गतुङ्गमालिकाम्।','डमड्डमड्डमड्डमन्निनादवड्डमर्वयं','चकार चण्डताण्डवं तनोतु नः शिवः शिवम् ॥१॥'],
        meaning: 'Shiva, whose neck is sanctified by water streaming from his dense matted locks, adorned with a garland of coiling serpents — whose drum resounds with the sound Damadd Damadd — may that Shiva performing the fierce Tandava bless us.'
      },
      {
        lines: ['जटाकटाहसम्भ्रमभ्रमन्निलिम्पनिर्झरी-','विलोलवीचिवल्लरीविराजमानमूर्धनि।','धगद्धगद्धगज्ज्वलल्ललाटपट्टपावके','किशोरचन्द्रशेखरे रतिः प्रतिक्षणं मम ॥२॥'],
        meaning: 'My devotion at every moment is to Shiva, on whose head the Ganga swirls like a whirlpool in the crown of matted hair, whose forehead blazes like a fire with the sound Dhagad Dhagad, and who wears the crescent moon.'
      },
      {
        lines: ['धराधरेन्द्रनन्दिनीविलासबन्धुबन्धुर-','स्फुरद्दिगन्तसन्ततिप्रमोदमानमानसे।','कृपाकटाक्षधोरणीनिरुद्धदुर्धरापदि','क्वचिद्दिगम्बरे मनो विनोदमेतु वस्तुनि ॥३॥'],
        meaning: 'May my mind find delight in Shiva, the sky-clad one, whose heart rejoices with Parvati (daughter of the mountain king), whose compassionate glance destroys all insurmountable misfortunes.'
      },
      {
        lines: ['जटाभुजङ्गपिङ्गलस्फुरत्फणामणिप्रभा-','कदम्बकुङ्कुमद्रवप्रलिप्तदिग्वधूमुखे।','मदान्धसिन्धुरस्फुरत्त्वगुत्तरीयमेदुरे','मनो विनोदमद्भुतं बिभर्तु भूतभर्तरि ॥४॥'],
        meaning: 'May my mind find wonderful delight in Shiva, the Lord of all beings, on whose matted locks the jewels of serpents cast reddish light illuminating the directions, who wears the skin of a mad elephant as his upper garment.'
      },
      {
        lines: ['सहस्रलोचनप्रभृत्यशेषलेखशेखर-','प्रसूनधूलिधोरणीविधूसराङ्घ्रिपीठभूः।','भुजङ्गराजमालया निबद्धजाटजूटकः','श्रियैचिराय जायतां चकोरबन्धुशेखरः ॥५॥'],
        meaning: 'May the moon-crested Shiva, whose feet are grey with the pollen of flowers offered by Indra and all the gods, whose matted hair is bound with the king of serpents, bestow lasting prosperity.'
      },
      {
        lines: ['ललाटचत्वरज्वलद्धनञ्जयस्फुलिङ्गभा-','निपीतपञ्चसायकं नमन्निलिम्पनायकम्।','सुधामयूखलेखया विराजमानशेखरं','महाकपालिसम्पदेशिरोजटालमस्तु नः ॥६॥'],
        meaning: 'May Shiva, who consumed Kamadeva with sparks from the fire blazing on his forehead, who is saluted by the lord of gods, who is adorned with the crescent moon, whose matted hair holds the great skull — may he grant us wealth.'
      },
      {
        lines: ['करालभालपट्टिकाधगद्धगद्धगज्ज्वल-','द्धनञ्जयाहुतीकृतप्रचण्डपञ्चसायके।','धराधरेन्द्रनन्दिनीकुचाग्रचित्रपत्रक-','प्रकल्पनैकशिल्पिनि त्रिलोचने रतिर्मम ॥७॥'],
        meaning: 'My devotion is in the three-eyed Shiva whose terrifying forehead blazes Dhagad Dhagad, who destroyed Kamadeva with fire, and who is the sole artist skilled in drawing ornamental designs on the breast of Parvati.'
      },
      {
        lines: ['नवीनमेघमण्डलीनिरुद्धदुर्धरस्फुरत्-','कुहूनिशीथिनीतमःप्रबद्धबद्धकन्धरः।','निलिम्पनिर्झरीधरस्तनोतु कृत्तिसिन्धुरः','कलानिधानबन्धुरः श्रियं जगद्धुरन्धरः ॥८॥'],
        meaning: 'May Shiva, whose neck is dark as the moonless midnight covered by thick new clouds, who bears the celestial river Ganga, who wears an elephant hide, whose crown is adorned by the crescent moon — may this bearer of the world bestow prosperity.'
      },
      {
        lines: ['प्रफुल्लनीलपङ्कजप्रपञ्चकालिमप्रभा-','विलम्बिकण्ठकन्दलीरुचिप्रबद्धकन्धरम्।','स्मरच्छिदं पुरच्छिदं भवच्छिदं मखच्छिदं','गजच्छिदान्धकच्छिदं तमन्तकच्छिदं भजे ॥९॥'],
        meaning: 'I worship Shiva, whose neck is dark as a blooming blue lotus, who destroyed Kamadeva, the three cities (Tripura), the cycle of existence, the sacrifice of Daksha, the elephant demon, Andhaka, and Death himself (Yama).'
      },
      {
        lines: ['अखर्वसर्वमङ्गलाकलाकदम्बमञ्जरी-','रसप्रवाहमाधुरीविजृम्भणामधुव्रतम्।','स्मरान्तकं पुरान्तकं भवान्तकं मखान्तकं','गजान्तकान्धकान्तकं तमन्तकान्तकं भजे ॥१०॥'],
        meaning: 'I worship Shiva, who is like a bee savoring the sweet nectar of all auspicious arts, who is the destroyer of Kama, Tripura, worldly existence, Daksha\'s sacrifice, the elephant demon, Andhaka, and even Death.'
      },
      {
        lines: ['जयत्वदभ्रविभ्रमभ्रमद्भुजङ्गमश्वस-','द्विनिर्गमत्क्रमस्फुरत्करालभालहव्यवाट्।','धिमिद्धिमिद्धिमिध्वनन्मृदङ्गतुङ्गमङ्गल-','ध्वनिक्रमप्रवर्तितप्रचण्डताण्डवः शिवः ॥११॥'],
        meaning: 'Victory to Shiva, who performs the fierce Tandava to the auspicious beat of the drum sounding Dhimid Dhimid Dhimi, from whose forehead fire shoots forth as serpents whirl in the sky with the sound of their breathing.'
      },
      {
        lines: ['दृषद्विचित्रतल्पयोर्भुजङ्गमौक्तिकस्रजो-','र्गरिष्ठरत्नलोष्ठयोः सुहृद्विपक्षपक्षयोः।','तृणारविन्दचक्षुषोः प्रजामहीमहेन्द्रयोः','समप्रवृत्तिकः कदा सदाशिवं भजाम्यहम् ॥१२॥'],
        meaning: 'When will I worship the eternal Shiva, who sees equally a stone slab and an ornate bed, a serpent and a pearl necklace, a king and a beggar, a blade of grass and a lotus-like eye, friend and foe?'
      },
      {
        lines: ['कदा निलिम्पनिर्झरीनिकुञ्जकोटरे वसन्','विमुक्तदुर्मतिः सदा शिरःस्थमञ्जलिं वहन्।','विमुक्तलोललोचनो ललामभाललग्नकः','शिवेति मन्त्रमुच्चरन् कदा सुखी भवाम्यहम् ॥१३॥'],
        meaning: 'When will I be happy, living in the bower on the banks of the Ganga, freed from wicked thoughts, hands always folded at my head, freed from wandering eyes, with the tilak on my forehead — chanting the mantra Shiva?'
      },
      {
        lines: ['इमं हि नित्यमेवमुक्तमुत्तमोत्तमं स्तवं','पठन् स्मरन् ब्रुवन्नरो विशुद्धिमेति संततम्।','हरे गुरौ सुभक्तिमाशु याति नान्यथा गतिं','विमोहनं हि देहिनां सुशङ्करस्य चिन्तनम् ॥१४॥'],
        meaning: 'Whoever reads, remembers or recites this best of hymns continually attains purification. He quickly gains devotion to Lord Shiva and there is no other path. Indeed, meditation on the auspicious Shankara dispels all delusion of mortals.'
      },
      {
        lines: ['पूजावसाने न्यसनं तु पादयोः क्रियते नृभिः','तेषां तु तत्फलं दद्यात् कल्पवृक्षसमं शिवः।','पठित्वेमां स्तुतिं दिव्यां मनुष्यः स्वर्गगामिनीम्','भोगं स्वर्गे लभेत् दिव्यं देहान्ते शिवसायुज्यम् ॥१५॥'],
        meaning: 'Those who offer this hymn at the feet of Shiva at the end of worship — Shiva grants them results equal to a wish-fulfilling tree. One who reads this divine hymn leading to heaven obtains divine pleasures in heaven and union with Shiva at life\'s end.'
      },
      {
        lines: ['रावण उवाच — कृत्वा स्तुतिं महादेवस्य','रावणेन महात्मना। प्रापतात् पुष्पकं दिव्यं','लङ्काधिपतिरेव च ॥१६॥'],
        meaning: 'Thus spoke Ravana: Having composed and recited this hymn to the great Lord Shiva, the noble-souled Ravana received the divine Pushpaka vimana and became lord of Lanka.'
      },
      {
        lines: ['शिवताण्डवस्तोत्रमिदं पठेद्यः','सदा शिवं ध्यायति भक्तियुक्तः।','स तारयेत् सर्वमहापदानि','लभेत च मोक्षं परमं सनातनम् ॥१७॥'],
        meaning: 'Whoever reads this Shiva Tandava Stotra, always meditating on Shiva with devotion — he crosses all great misfortunes and attains the highest eternal liberation.'
      }
    ]
  },
  {
    id: 'rudrashtakam',
    name: 'Rudrashtakam',
    nameDevanagari: 'रुद्राष्टकम्',
    author: 'Tulsidas',
    verseCount: 8,
    verses: [
      {
        lines: ['नमामीशमीशान निर्वाणरूपं','विभुं व्यापकं ब्रह्मवेदस्वरूपम्।','निजं निर्गुणं निर्विकल्पं निरीहं','चिदाकाशमाकाशवासं भजेऽहम् ॥१॥'],
        meaning: 'I bow to the Lord, the supreme ruler, who is the embodiment of liberation, omnipresent, all-pervading, the essence of the Vedas and Brahman — attributeless, undivided, desireless — I worship him who dwells in the sky of consciousness, the sky-clad one.'
      },
      {
        lines: ['निराकारमोङ्कारमूलं तुरीयं','गिरा ज्ञान गोतीत मीशं गिरीशम्।','करालं महाकालकालं कृपालुं','गुणागार संसारपारं नतोऽहम् ॥२॥'],
        meaning: 'I bow to the formless one, the root of Om, the fourth state of consciousness, beyond speech, knowledge and the senses — the Lord of mountains, the terrifying great Time of Time, yet compassionate, abode of all virtues, who takes us beyond this world.'
      },
      {
        lines: ['तुषाराद्रिसंकाशगौरं गभीरं','मनोभूतकोटिप्रभाश्रीशरीरम्।','स्फुरन्मौलिकल्लोलिनी चारुगङ्गा-','लसद्भालबालेन्दु कण्ठे भुजङ्गा ॥३॥'],
        meaning: 'Fair as the snow-clad Himalayas, profound in nature, whose beautiful body shines with the radiance of ten million love-gods — on whose crown the Ganga flows in waves, on whose forehead gleams the crescent moon, and around whose neck coils a serpent.'
      },
      {
        lines: ['चलत्कुण्डलं भ्रूसुनेत्रं विशालं','प्रसन्नाननं नीलकण्ठं दयालम्।','मृगाधीशचर्माम्बरं मुण्डमालं','प्रियं शंकरं सर्वनाथं भजामि ॥४॥'],
        meaning: 'I worship the beloved Shankara, lord of all, with swinging earrings, beautiful brows and large eyes, with a serene face, with a blue throat, compassionate — wearing the skin of the tiger, adorned with a garland of skulls.'
      },
      {
        lines: ['प्रचण्डं प्रकृष्टं प्रगल्भं परेशं','अखण्डं अजं भानुकोटिप्रकाशम्।','त्र्यःशूलनिर्मूलनं शूलपाणिं','भजेऽहं भवानीपतिं भावगम्यम् ॥५॥'],
        meaning: 'I worship the fierce, supreme, bold and highest Lord — undivided, unborn, radiant as ten million suns — who holds the trident that uproots all three kinds of suffering, the lord of Bhavani (Parvati), attainable only through devotion.'
      },
      {
        lines: ['कलातीतकल्याण कल्पान्तकारी','सदा सज्जनानन्ददाता पुरारी।','चिदानन्दसंदोह मोहापहारी','प्रसीद प्रसीद प्रभो मन्मथारी ॥६॥'],
        meaning: 'O destroyer of Tripura (Purari), O Manmathajit (destroyer of Kama) — you who are beyond time, the embodiment of auspiciousness, the destroyer at the end of the cosmic cycle, ever giving joy to the virtuous — full of consciousness and bliss, remover of illusion — be pleased, be pleased, O Lord!'
      },
      {
        lines: ['न यावदुमानाथपादारविन्दं','भजन्तीह लोके परे वा नराणाम्।','न तावत्सुखं शान्ति संतापनाशं','प्रसीद प्रभो सर्वभूताधिवासम् ॥७॥'],
        meaning: 'As long as people in this world or the next do not worship the lotus feet of Shiva, lord of Uma — there is no happiness, no peace, no destruction of sorrow for them. Be pleased, O Lord who dwells in all beings.'
      },
      {
        lines: ['न जानामि योगं जपं नैव पूजां','नतोऽहं सदा सर्वदा शम्भुतुभ्यम्।','जराजन्मदुःखौघतातप्यमानं','प्रभो पाहि आपन्नमामीश शंभो ॥८॥'],
        meaning: 'I know neither yoga, nor chanting, nor worship — yet I bow to you always, O Shambhu. I am tormented by the flood of sorrows of old age and birth — protect me, O Lord, I am in distress, O Ishana, O Shambhu!'
      }
    ]
  },
  {
    id: 'panchakshara',
    name: 'Shiva Panchakshara Stotram',
    nameDevanagari: 'शिवपञ्चाक्षरस्तोत्रम्',
    author: 'Adi Shankaracharya',
    verseCount: 5,
    verses: [
      {
        lines: ['नागेन्द्रहाराय त्रिलोचनाय','भस्माङ्गरागाय महेश्वराय।','नित्याय शुद्धाय दिगम्बराय','तस्मै नकाराय नमः शिवाय ॥१॥'],
        meaning: 'To the syllable NA — salutations to Shiva, who wears the serpent king as a garland, who has three eyes, whose body is smeared with ash, who is the great lord, eternal, pure and sky-clad.'
      },
      {
        lines: ['मन्दाकिनीसलिलचन्दनचर्चिताय','नन्दीश्वरप्रमथनाथमहेश्वराय।','मन्दारपुष्पबहुपुष्पसुपूजिताय','तस्मै मकाराय नमः शिवाय ॥२॥'],
        meaning: 'To the syllable MA — salutations to Shiva, who is anointed with the waters of the Mandakini river and sandalwood paste, who is the lord of Nandi and the Pramatha hosts, and who is worshipped with Mandara flowers and many other blossoms.'
      },
      {
        lines: ['शिवाय गौरीवदनाब्जवृन्द-','सूर्याय दक्षाध्वरनाशकाय।','श्रीनीलकण्ठाय वृषध्वजाय','तस्मै शिकाराय नमः शिवाय ॥३॥'],
        meaning: 'To the syllable SHHI — salutations to Shiva, who is auspiciousness itself, who is like the sun to the lotus-face of Gauri, who destroyed Daksha\'s sacrifice, who has the beautiful blue throat, and whose banner bears the bull.'
      },
      {
        lines: ['वशिष्ठकुम्भोद्भवगौतमार्य-','मुनीन्द्रदेवार्चितशेखराय।','चन्द्रार्कवैश्वानरलोचनाय','तस्मै वकाराय नमः शिवाय ॥४॥'],
        meaning: 'To the syllable VA — salutations to Shiva, who is worshipped by great sages like Vasishtha, Agastya and Gautama, and by the best of gods — whose three eyes are the moon, the sun and fire.'
      },
      {
        lines: ['यक्षस्वरूपाय जटाधराय','पिनाकहस्ताय सनातनाय।','दिव्याय देवाय दिगम्बराय','तस्मै यकाराय नमः शिवाय ॥५॥'],
        meaning: 'To the syllable YA — salutations to Shiva, whose form is like the Yaksha king, who bears matted locks, who holds the Pinaka bow, who is eternal, divine, the resplendent deity and the sky-clad one.'
      }
    ]
  },
  {
    id: 'mahishasura-mardini',
    name: 'Mahishasura Mardini',
    nameDevanagari: 'महिषासुरमर्दिनीस्तोत्रम्',
    author: 'Adi Shankaracharya',
    verseCount: 21,
    verses: [
      {
        lines: ['अयि गिरिनन्दिनि नन्दितमेदिनि विश्वविनोदिनि नन्दनुते','गिरिवरविन्ध्यशिरोऽधिनिवासिनि विष्णुविलासिनि जिष्णुनुते।','भगवति हे शितिकण्ठकुटुम्बिनि भूरिकुटुम्बिनि भूरिकृते','जय जय हे महिषासुरमर्दिनि रम्यकपर्दिनि शैलसुते ॥१॥'],
        meaning: 'O daughter of the mountain, who brings joy to the earth, who delights the universe, praised by Nanda — dwelling on the peak of the great Vindhya mountains, praised by Vishnu and Indra — O Goddess, consort of the blue-throated Shiva, mother of a vast family — victory, victory to you, O slayer of Mahishasura, with beautiful braids, O daughter of the mountain!'
      },
      {
        lines: ['सुरवरवर्षिणि दुर्धरधर्षिणि दुर्मुखमर्षिणि हर्षरते','त्रिभुवनपोषिणि शंकरतोषिणि किल्बिषमोषिणि घोषरते।','दनुजनिरोषिणि दितिसुतरोषिणि दुर्मदशोषिणि सिन्धुसुते','जय जय हे महिषासुरमर्दिनि रम्यकपर्दिनि शैलसुते ॥२॥'],
        meaning: 'You shower blessings on the gods, you crush the invincible, you endure the ugly-faced demons, you delight in joy — you nourish the three worlds, you please Shankara, you steal away sins, you delight in battle-sounds. You fill the sons of Danu and Diti with anger, you dry up the arrogant — victory, victory O slayer of Mahishasura!'
      },
      {
        lines: ['अयि जगदम्ब मदम्ब कदम्ब वनप्रियवासिनि हासरते','शिखरि शिरोमणि तुङ्गहिमालय शृङ्गनिजालय मध्यगते।','मधुमधुरे मधुकैटभगञ्जिनि कैटभभञ्जिनि रासरते','जय जय हे महिषासुरमर्दिनि रम्यकपर्दिनि शैलसुते ॥३॥'],
        meaning: 'O mother of the world, my own mother, dwelling joyfully in the Kadamba forest, sporting with laughter — on the jewel-peak of the great Himalayas, making your home among the high summits — sweet as honey, who crushed Madhu and Kaitabha — victory, victory O slayer of Mahishasura!'
      },
      {
        lines: ['अयि शतखण्ड विखण्डितरुण्ड वितुण्डितशुण्ड गजाधिपते','रिपुगजगण्ड विदारणचण्ड परीक्षितिशुण्ड मृगाधिपते।','निजभुजदण्ड निपातितखण्ड विपातितमुण्ड भटाधिपते','जय जय हे महिषासुरमर्दिनि रम्यकपर्दिनि शैलसुते ॥४॥'],
        meaning: 'O Goddess, you split the head of the enemy demon elephant into hundreds of pieces, you tore apart the cheeks of enemy elephants fiercely — you struck down the chief of warriors, scattering their heads with your own arm. Victory, victory O slayer of Mahishasura!'
      },
      {
        lines: ['अयि रणदुर्मद शत्रुवधोदित दुर्धरनिर्जर शक्तिभृते','चतुरविचार धुरीणमहाशिव दूतकृत प्रमथाधिपते।','दुरितदुरीह दुराशयदुर्मति दानवदुत कृतान्तमते','जय जय हे महिषासुरमर्दिनि रम्यकपर्दिनि शैलसुते ॥५॥'],
        meaning: 'O bearer of irresistible divine power, who arose for the destruction of the battle-intoxicated enemy — sent as a messenger of the wise and great Shiva, lord of the Pramatha hosts — bringing death to the sinful, evil-intentioned, wicked-minded demons. Victory, victory O slayer of Mahishasura!'
      },
      {
        lines: ['अयि शरणागत वैरिवधूवर वीरवराभय दायकरे','त्रिभुवनमस्तक शूलविरोधि शिरोऽधिकृताम्ल विशोषकरे।','दुमिदुमितामर धुन्दुभिनाद महोमुखरीकृत दिग्करे','जय जय हे महिषासुरमर्दिनि रम्यकपर्दिनि शैलसुते ॥६॥'],
        meaning: 'O Goddess, you give safety to warriors and the wives of enemies who take refuge in you — you withered the head of the one opposing the trident across the three worlds — to the sound of celestial drums resounding in all directions. Victory, victory O slayer of Mahishasura!'
      },
      {
        lines: ['अयि निजहुङ्कृति मात्रनिराकृत धूम्रविलोचन धूम्रशते','समरविशोषित शोणितबीज समुद्भवशोणित बीजलते।','शिव शिव शुम्भ निशुम्भ महाहव तर्पितभूत पिशाचरते','जय जय हे महिषासुरमर्दिनि रम्यकपर्दिनि शैलसुते ॥७॥'],
        meaning: 'O Goddess, who destroyed Dhumravilochana with just your Humkara (fierce sound) — who in battle dried up Raktabija, the demon reborn from every drop of blood — who in the great war of Shumbha and Nishumbha delighted the spirits and goblins with offerings. Victory, victory O slayer of Mahishasura!'
      },
      {
        lines: ['धनुरनुसङ्ग रणक्षणसङ्ग परिस्फुरदङ्ग नटत्कटके','कनकपिशङ्ग पृषत्कनिषङ्ग रसद्भटशृङ्ग हताबटुके।','कृतचतुरङ्ग बलक्षितिरङ्ग घटद्बहुरङ्ग रटद्बटुके','जय जय हे महिषासुरमर्दिनि रम्यकपर्दिनि शैलसुते ॥८॥'],
        meaning: 'O Goddess, in the moment of battle you strung the bow with quiver of golden-tinted arrows, your bracelets glittering — you defeated the young warriors of the fourfold army deployed across the battlefield in many formations. Victory, victory O slayer of Mahishasura!'
      },
      {
        lines: ['जय जय जप्य जयेजयशब्द परस्तुतितत्पर विश्वनुते','झणझणझिञ्झिमि झिङ्कृत नूपुर शिञ्जितमोहित भूतपते।','नटित नटार्ध नटी नट नायक नाटितनाट्य सुगानरते','जय जय हे महिषासुरमर्दिनि रम्यकपर्दिनि शैलसुते ॥९॥'],
        meaning: 'Victory, victory — praised by all the world through victorious words — whose anklets ring with the sound jhana jhana, enchanting the Lord of beings — the dancer, the half-dancer (Shiva as Ardhanari), the actress, the dance-leader, delighting in divine performance. Victory, victory O slayer of Mahishasura!'
      },
      {
        lines: ['अयि सुमनःसुमनःसुमनः सुमनःसुमनोहरकान्तियुते','श्रितरजनी रजनीरजनी रजनीरजनी करवक्त्रवृते।','सुनयनविभ्रमर भ्रमरभ्रमर भ्रमरभ्रमराधिपते','जय जय हे महिषासुरमर्दिनि रम्यकपर्दिनि शैलसुते ॥१०॥'],
        meaning: 'O Goddess of enchanting beauty adorned with beautiful flowers, whose face is surrounded by the night-like dark tresses of hair — whose beautiful eyes are like roving, circling bees drawn to the lotus. Victory, victory O slayer of Mahishasura!'
      },
      {
        lines: ['सहितमहाहव मल्लमतल्लिक मल्लितरल्लक मल्लरते','विरचितवल्लिक पल्लिकमल्लिक झिल्लिकभिल्लिक वर्गवृते।','शितकृतफुल्ल समुल्लसितारुण तल्लजपल्लव सल्ललिते','जय जय हे महिषासुरमर्दिनि रम्यकपर्दिनि शैलसुते ॥११॥'],
        meaning: 'O Goddess, delighting in the great combat of mighty warriors clashing together, surrounded by groups of tribal women adorned with jasmine garlands — blooming and radiant with reddish tender sprouts. Victory, victory O slayer of Mahishasura!'
      },
      {
        lines: ['अविरलगण्ड गलन्मदमेदुर मत्तमतङ्ग जराजपते','त्रिभुवनभूषण भूतकलानिधि रूपयुते ऋगुणोद्गते।','अमरपति आनत पदयुगले वरदे शरणागत वत्सलते','जय जय हे महिषासुरमर्दिनि रम्यकपर्दिनि शैलसुते ॥१२॥'],
        meaning: 'O Goddess, the lord of intoxicated great elephants with temples streaming with rut bows before you — adorned with the arts of the three worlds, rising above the three qualities — at whose feet Indra himself bows, the boon-giver who loves those who seek refuge. Victory, victory O slayer of Mahishasura!'
      },
      {
        lines: ['दुर्गमसंशय दुर्मिगशत्रु दुर्मिगशत्रु विनाशकृते','दुर्मिगशत्रु दुर्घटघटित दुर्मिग मार्गविशोधयते।','दुर्मिगशत्रुवधोदित दुर्मिग शक्तिभृते शुभदायकृते','जय जय हे महिषासुरमर्दिनि रम्यकपर्दिनि शैलसुते ॥१३॥'],
        meaning: 'O Goddess, you destroy the impassable doubt and the formidable enemy — you clear the difficult path made difficult by impossible obstacles — you bear the irresistible power born of slaying the formidable enemy, bestowing auspiciousness. Victory, victory O slayer of Mahishasura!'
      },
      {
        lines: ['शरणागतदीनार्तपरित्राण परायणे','सर्वस्यार्तिहरे देवि नारायणि नमोऽस्तु ते।','सर्वस्वरूपे सर्वेशे सर्वशक्तिसमन्विते','भयेभ्यस्त्राहि नो देवि दुर्गे देवि नमोऽस्तु ते ॥१४॥'],
        meaning: 'O Narayani, devoted to protecting the poor and afflicted who seek refuge — O Devi who removes all suffering, salutations to you. O Devi of all forms, ruler of all, endowed with all powers — O Durgha, save us from all fears, salutations to you.'
      },
      {
        lines: ['रोगानशेषानपहंसि तुष्टा','रुष्टा तु कामान् सकलानभीष्टान्।','त्वामाश्रितानां न विपन्नराणां','त्वामाश्रिता ह्याश्रयतां प्रयान्ति ॥१५॥'],
        meaning: 'When pleased you destroy all diseases; when displeased you destroy all desires. For those who take refuge in you there is no misfortune — indeed those who seek refuge in you themselves become a refuge for others.'
      },
      {
        lines: ['एतत्ते वदनं सौम्यं लोचनत्रयभूषितम्','पातु नः सर्वभूतेभ्यः कात्यायनि नमोऽस्तु ते।','ज्वालाकरालमत्युग्रमशेषासुरसूदनम्','त्रिशूलं पातु नो भीतेः भद्रकालि नमोऽस्तु ते ॥१६॥'],
        meaning: 'O Katyayani, may your gentle face adorned with three eyes protect us from all beings — salutations to you. O Bhadrakali, may your terrifying trident blazing with flames that destroys all demons protect us from fear — salutations to you.'
      },
      {
        lines: ['हिनस्ति दैत्यतेजांसि स्वनेनापूर्य या जगत्','सा घण्टा पातु नो देवि पापेभ्योऽनः सुतानिव।','असुरासृग्वसापङ्क चर्चितास्ते करोज्ज्वलाः','शुभाय खड्गबद्धश्च तदा देवी नमोऽस्तु ते ॥१७॥'],
        meaning: 'May your bell, which destroys the prowess of demons by filling the world with its sound, protect us from sins as a mother protects her children. Your blazing arms smeared with the blood and fat of demons — and the sword with which you are bound — may that be for our auspiciousness. Salutations to the Goddess.'
      },
      {
        lines: ['रक्षांसि यत्रोग्रविषाश्च नागा','यत्रारयो दस्युबलानि यत्र।','दावानलो यत्र तथाब्धिमध्ये','तत्र स्थिता त्वं परिपासि विश्वम् ॥१८॥'],
        meaning: 'Where there are terrible demons, where there are serpents of fierce poison, where there are enemies and armies of bandits, where there is a forest fire, where one is in the middle of the ocean — there you stand and protect the whole world.'
      },
      {
        lines: ['त्वमेव सन्ध्या सवित्री त्वमेव','त्वमेव गायत्री च वेदमाता।','त्वमेव विष्णुः त्वमेव रुद्रः','त्वमेव ब्रह्मा त्वमेव सृष्टा ॥१९॥'],
        meaning: 'You alone are Sandhya (twilight prayer) and Savitri, you alone are Gayatri and mother of the Vedas. You alone are Vishnu, you alone are Rudra, you alone are Brahma, the creator.'
      },
      {
        lines: ['शरणागत दीनार्त परित्राण परायणे','सर्वस्यार्तिहरे देवि नारायणि नमोऽस्तु ते।','एवं स्तुता हि देवी सा शुभां सर्वार्थसाधिनीम्','प्रसन्नवदना चैव वरदां मे प्रदास्यति ॥२०॥'],
        meaning: 'O Narayani, devoted to protecting the poor and afflicted who take refuge — O Devi who removes all suffering, salutations to you. The Goddess thus praised, with a pleased face, will grant me what is auspicious and fulfills all purposes.'
      },
      {
        lines: ['या देवी सर्वभूतेषु शक्तिरूपेण संस्थिता','नमस्तस्यै नमस्तस्यै नमस्तस्यै नमो नमः।','महिषासुरमर्दिन्यै शिवदायै नमो नमः','जय जय हे महिषासुरमर्दिनि रम्यकपर्दिनि शैलसुते ॥२१॥'],
        meaning: 'The Goddess who dwells in all beings in the form of power — salutations to her, salutations to her, salutations to her, salutations again and again. Salutations again and again to the slayer of Mahishasura, the giver of auspiciousness. Victory, victory O slayer of Mahishasura, with beautiful braids, O daughter of the mountain!'
      }
    ]
  },
  {
    id: 'maha-mrityunjaya',
    name: 'Maha Mrityunjaya Mantra',
    nameDevanagari: 'महामृत्युञ्जयमन्त्रः',
    author: 'Rigveda (7.59.12)',
    verseCount: 1,
    verses: [
      {
        lines: ['ॐ त्र्यम्बकं यजामहे','सुगन्धिं पुष्टिवर्धनम्।','उर्वारुकमिव बन्धनान्','मृत्योर्मुक्षीय माऽमृतात् ॥'],
        meaning: 'We worship the three-eyed Lord Shiva who is fragrant and who nourishes all beings. May He liberate us from death, as a ripe cucumber is freed from its bondage with the vine — and may He not withhold immortality from us.'
      }
    ]
  }
];
