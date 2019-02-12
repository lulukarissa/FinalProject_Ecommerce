const data = {
    provinces: [
      { id: 1, name: 'P1' },
      { id: 2, name: 'P2' },
      { id: 3, name: 'P3' },
      { id: 4, name: 'P4' },
    ],
    cities: [
      { id: 1, name: 'C1', provinceId: 1 },
      { id: 2, name: 'C2', provinceId: 1 },
      { id: 3, name: 'C3', provinceId: 1 },
      { id: 4, name: 'C4', provinceId: 2 },
      { id: 5, name: 'C5', provinceId: 2 },
      { id: 6, name: 'C6', provinceId: 3 },
      { id: 7, name: 'C7', provinceId: 4 },
    ]
  };
  
  class Province extends React.Component {
    onSelect = (event) => {
      this.props.onSelect(parseInt(event.target.value));
    }
    render() {
      return (
        <div>
          <span>Province: </span>
          <select onChange={this.onSelect} >
            <option>Select province</option>
            {
              this.props.data.map(prov => (
                <option
                  key={prov.id}
                  value={prov.id}
                  selected={this.props.selectedId === prov.id}>
                  {prov.name}
                </option>
              ))
            }
          </select>
        </div>
      );
    }
  }
  
  class City extends React.Component {
    onSelect = (event) => {
      this.props.onSelect(parseInt(event.target.value));
    }
    render() {
      return (
        <div>
          <span>City: </span>
          <select onClick={this.onSelect}>
            <option>Select city</option>
            {
              this.props.data.map(city => (
                  <option
                    key={city.id}
                    value={city.id}
                    selected={this.props.selectedId === city.id}>
                    {city.name}
                  </option>
              ))
            }
          </select>
        </div>
      );
    }
  }
  
  
  class Address extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        provinces: data.provinces,
        provinceId: null,
        cities: data.cities,
        cityId: null
      };
    }
  
    onSelectProvince = (provId) => {
      const selCities = data.cities.filter(c => c.provinceId === provId);
      this.setState({
        provinceId: provId,
        cities: selCities
      });
    }
  
    onSelectCity = (city) => {
      this.setState({
        cityId: city.id
      });
    }
  
    render() {
      return (
        <div>
          <Province
            data={this.state.provinces}
            selectedId={this.state.provinceId}
            onSelect={this.onSelectProvince} />
          <City
            data={this.state.cities}
            selectedId={this.state.cityId}
            onSelect={this.onSelectCity} />
        </div>
      );
    }
  }