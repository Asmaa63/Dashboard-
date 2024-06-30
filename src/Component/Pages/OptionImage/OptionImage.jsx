import React, { useState } from 'react';
import Select from 'react-select';
import './OptionImage.css';


const options = [
    { value: '352', label: "Ambrosia Apple (Malus 'Ambrosia')", image: require('./Images/image1.png') },
    { value: '367', label: "Honeycrisp Apple (Malus 'Honeycrisp')", image: require('./Images/image2.png' )},
    { value: '1893', label: "Mandarin Orange (Citrus reticulata 'Clementine')", image: require('./Images/image3.png') },
    { value: '1895', label: "Navel Orange (Citrus sinensis 'Trovita')", image: require('./Images/image4.png') },
    { value: '1896', label: "Navel Orange (Citrus sinensis 'Washington')", image: require('./Images/image5.png') },
    { value: '524', label: "White Baneberry (Actaea pachypoda)", image: require('./Images/image6.png') },
    { value: '921', label: "Common Bearberry (Arctostaphylos uva-ursi 'Big Bear')", image: require('./Images/image7.png') },
    { value: '1596', label: "Sweet Pepper (Capsicum annuum 'Bananarama')", image: require('./Images/image8.png') },
    { value: '536', label: "Kiwifruit (Actinidia deliciosa)", image: require('./Images/image9.png') },
    { value: '1154', label: "Star Fruit (Averrhoa carambola)", image: require('./Images/image10.png') },
    { value: '1479', label: "Beautyberry (Callicarpa bodinieri)", image: require('./Images/image11.png') },
    { value: '2787', label: "Tree Heath (Erica arborea)", image: require('./Images/image12.png') },
    { value: '1', label: "European Silver Fir (Abies alba)", image:require('./Images/image13.png') },
    { value: '1846', label: "Spider Plant (Chlorophytum 'Bonnie')", image: require('./Images/image14.png') },
    { value: '2773', label: "Golden Pothos (Epipremnum aureum)", image:require('./Images/image15.png') },
    { value: '288', label: "Common Fig (Ficus carica)", image: require('./Images/image16.png') },
    { value: '2963', label: "Fiddle-Leaf Fig (Ficus lyrata)", image:require('./Images/image17.png') },
    { value: '2533', label: "Dracaena (Dracaena sanderiana)", image: require('./Images/image18.png') },
    { value: '1953', label: "Clematis (Clematis 'Silver Moon')", image: require('./Images/image19.png') },
    { value: '2', label: "Pyramidalis Silver Fir (Abies alba 'Pyramidalis')", image:require('./Images/image20.png') },
    { value: '45', label: "White Fir (Abies concolor)", image: require('./Images/image21.png') },
    { value: '46', label: "Candicans White Fir (Abies concolor 'Candicans')", image: require('./Images/image22.png') },
    { value: '47', label: "Fraser Fir (Abies fraseri)", image: require('./Images/image23.png') },
    { value: '48', label: "Golden Korean Fir (Abies koreana 'Aurea')", image: require('./Images/image24.png') },
    { value: '49', label: "Alpine Fir (Abies lasiocarpa)", image: require('./Images/image25.png') },
    { value: '50', label: "Blue Spanish Fir (Abies pinsapo 'Glauca')", image:require('./Images/image26.png') },
    { value: '51', label: "Noble Fir (Abies procera)", image: require('./Images/image27.png') },
    { value: '52', label: "Johin Japanese Maple (Acer 'Johin')", image: require('./Images/image28.png')},
    { value: '53', label: "Snakebark Maple (Acer davidii)", image: require('./Images/image29.png') },
  ];
  
  

function OptionImage() {
  const [selectedOption, setSelectedOption] = useState(options[0]);

  const customStyles = {
    option: (provided, state) => ({
      ...provided,
      backgroundColor: state.isSelected ? '#358D48' : 'white',
      color: state.isSelected ? 'white' : 'black',
      ':hover': {
        backgroundColor: '#e8e5e5',
        color: 'black',
      },
    }),
    control: (provided) => ({
      ...provided,
      backgroundColor: '#f8f9fa',
    }),
    menu: (provided) => ({
      ...provided,
      backgroundColor: '#000',
    }),
    singleValue: (provided) => ({
      ...provided,
      color: '#000',
    }),
  };


  return (
    <div className="containerimage">
      <div className="dropdown-images">
        <label className='Labelselectimage'>Select specie</label>
        <Select
          options={options}
          onChange={setSelectedOption}
          className="dropdownimg"
          styles={customStyles}
        />
      </div>
      <div className='dvimage'>
      {selectedOption && (
          <div className="image-containerimage">
            <img src={selectedOption.image} alt={selectedOption.label} />
          </div>
        )}
      </div>
    </div>
  );
}

export default OptionImage;
