import React from 'react'

type AcceptedProps ={
    zip: number
}

type LocState={
    locData: {
        places: [
            {
                'place name': string
                'state abbreviation': string
            }
        ]
    },
}

export default class LocData extends React.Component<AcceptedProps, LocState>{
    constructor(props: AcceptedProps){
        super(props)
        this.state={
            locData: {
                places: [
                    {
                        'place name': 'Indianapolis',
                        'state abbreviation': 'IN'
                    }
                ]
            },
        }
        this.zipToLocation = this.zipToLocation.bind(this)
        this.placeMap = this.placeMap.bind(this)
    }
    componentDidMount(){
        this.zipToLocation()
        console.log('getting location');
    }
    zipToLocation() {
        // this.setState({ dataFetched: true })
        fetch(`https://api.zippopotam.us/us/${this.props.zip}`)
            .then(res => res.json())
            .then(data => this.setState({ locData: data }))
            .then(() => { console.log(this.state.locData) })
    }
    
    placeMap(){
        if(this.state.locData.places !== undefined){
            return this.state.locData.places.map((i)=>{
                return i['place name'] + ', ' + i['state abbreviation']
            })
        } else {
            return null
        }
    }
    render(){
        return(
            <p>{this.placeMap()}</p>    
            )
        }
    }