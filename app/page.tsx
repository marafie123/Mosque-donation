'use client'

import { useState, useMemo } from 'react'
import Link from 'next/link'
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { MoonIcon as CrescentMoon, HeartHandshake, Landmark, PlusCircle, Search } from 'lucide-react'
import { NeedDetailsModal } from '@/components/need-details-modal'
import { Toast } from '@/components/toast'
import { useMosqueContext } from '@/contexts/MosqueContext'

const safeArray = <T,>(value: T[] | null | undefined): T[] => {
  if (Array.isArray(value)) return value;
  if (value == null) return [];
  return [value];
};

const mosques = [
  { 
    id: 1, 
    name: "London Central Mosque", 
    location: "London, United Kingdom",
    address: "146 Park Rd, London NW8 7RG, United Kingdom",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0a/London_Central_Mosque.jpg/1280px-London_Central_Mosque.jpg",
    oneOffNeeds: [
      { id: 'roof', name: 'Roof Repair', price: 5000, raised: 2000, description: "Our mosque's roof is in urgent need of repair to prevent water damage and ensure the safety of our congregation." },
      { id: 'ac', name: 'New AC System', price: 3000, raised: 1500, description: "Help us install a new air conditioning system to provide a comfortable environment for worship during hot summer months." },
    ],
    ongoingNeeds: [
      { id: 'cleaning', name: 'Cleaning Supplies', monthlyPrice: 300, description: "Support our monthly purchase of cleaning supplies to maintain a hygienic environment for all visitors." },
      { id: 'electricity', name: 'Electricity Bills', monthlyPrice: 800, description: "Contribute to our monthly electricity bills to keep our mosque well-lit and functioning." },
    ],
  },
  { 
    id: 2, 
    name: "East London Mosque", 
    location: "London, United Kingdom",
    address: "82-92 Whitechapel Rd, London E1 1JQ, United Kingdom",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5d/East_London_Mosque%2C_Whitechapel_-_geograph.org.uk_-_1747783.jpg/1280px-East_London_Mosque%2C_Whitechapel_-_geograph.org.uk_-_1747783.jpg",
    oneOffNeeds: [
      { id: 'library', name: 'Expand Library Collection', price: 2000, raised: 800, description: "Help us expand our Islamic library with new books and resources for our community's benefit." },
      { id: 'carpets', name: 'New Prayer Hall Carpets', price: 4000, raised: 1000, description: "Support the replacement of our worn-out prayer hall carpets to enhance the prayer experience." },
    ],
    ongoingNeeds: [
      { id: 'utilities', name: 'Water and Gas Bills', monthlyPrice: 600, description: "Contribute to our monthly water and gas bills to ensure our mosque remains functional and comfortable." },
      { id: 'cleaning_service', name: 'Professional Cleaning Service', monthlyPrice: 500, description: "Support our weekly professional cleaning service to maintain a pristine environment for worship." },
    ],
  },
  { 
    id: 3, 
    name: "Birmingham Central Mosque", 
    location: "Birmingham, United Kingdom",
    address: "180 Belgrave Middleway, Birmingham B12 0XS, United Kingdom",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d9/Birmingham_Central_Mosque_-_geograph.org.uk_-_1738980.jpg/1280px-Birmingham_Central_Mosque_-_geograph.org.uk_-_1738980.jpg",
    oneOffNeeds: [
      { id: 'security', name: 'Security System Upgrade', price: 3000, raised: 1500, description: "Help us upgrade our security system to ensure the safety of our mosque and its visitors." },
      { id: 'playground', name: 'Children\'s Playground', price: 5000, raised: 2000, description: "Support the construction of a children's playground to make our mosque more family-friendly." },
    ],
    ongoingNeeds: [
      { id: 'heating', name: 'Heating Costs', monthlyPrice: 700, description: "Contribute to our monthly heating costs to keep our mosque warm and welcoming, especially during colder months." },
      { id: 'maintenance', name: 'General Maintenance', monthlyPrice: 400, description: "Support our ongoing general maintenance needs to keep our facilities in good condition." },
    ],
  },
  { 
    id: 4, 
    name: "Manchester Central Mosque", 
    location: "Manchester, United Kingdom",
    address: "20 Upper Park Rd, Manchester M14 5RU, United Kingdom",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1c/Manchester_Central_Mosque.jpg/1280px-Manchester_Central_Mosque.jpg",
    oneOffNeeds: [
      { id: 'renovation', name: 'Prayer Hall Renovation', price: 10000, raised: 3000, description: "Help us renovate our main prayer hall to accommodate our growing community and improve accessibility." },
      { id: 'soundsystem', name: 'New Sound System', price: 5000, raised: 2000, description: "Support the installation of a new sound system to enhance the quality of our sermons and announcements." },
    ],
    ongoingNeeds: [
      { id: 'electricity', name: 'Electricity Bills', monthlyPrice: 900, description: "Help cover our monthly electricity bills to keep our mosque well-lit and operational." },
      { id: 'cleaning_supplies', name: 'Cleaning Supplies', monthlyPrice: 250, description: "Contribute to our monthly purchase of cleaning supplies to maintain a hygienic environment." },
    ],
  },
  { 
    id: 5, 
    name: "Glasgow Central Mosque", 
    location: "Glasgow, United Kingdom",
    address: "1 Mosque Ave, Glasgow G5 9TA, United Kingdom",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5a/Glasgow_Central_Mosque_-_geograph.org.uk_-_1770190.jpg/1280px-Glasgow_Central_Mosque_-_geograph.org.uk_-_1770190.jpg",
    oneOffNeeds: [
      { id: 'library', name: 'Digital Library Project', price: 7000, raised: 2500, description: "Help us create a digital library to make Islamic resources more accessible to our community members." },
      { id: 'greeninitiative', name: 'Green Energy Initiative', price: 15000, raised: 5000, description: "Support our initiative to install solar panels and reduce our carbon footprint." },
    ],
    ongoingNeeds: [
      { id: 'water', name: 'Water Bills', monthlyPrice: 400, description: "Contribute to our monthly water bills to maintain cleanliness and support our ablution facilities." },
      { id: 'internet', name: 'Internet and Phone Services', monthlyPrice: 150, description: "Support our monthly internet and phone services to keep our mosque connected and accessible." },
    ],
  },
  { 
    id: 6, 
    name: "Leeds Grand Mosque", 
    location: "Leeds, United Kingdom",
    address: "9 Woodsley Rd, Leeds LS3 1DT, United Kingdom",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d4/Leeds_Grand_Mosque_-_geograph.org.uk_-_1778995.jpg/1280px-Leeds_Grand_Mosque_-_geograph.org.uk_-_1778995.jpg",
    oneOffNeeds: [
      { id: 'expansion', name: 'Mosque Expansion Project', price: 50000, raised: 20000, description: "Support our mosque expansion project to accommodate our growing community and provide more services." },
      { id: 'parking', name: 'Parking Lot Improvement', price: 8000, raised: 3000, description: "Help us improve our parking facilities to better serve our congregation and visitors." },
    ],
    ongoingNeeds: [
      { id: 'cleaning_service', name: 'Professional Cleaning Service', monthlyPrice: 600, description: "Support our bi-weekly professional cleaning service to maintain a pristine environment for worship." },
      { id: 'utilities', name: 'Utility Bills', monthlyPrice: 1000, description: "Contribute to our monthly utility bills including electricity, gas, and water to keep our mosque functioning." },
    ],
  },
]

function getDirectionsUrl(address: string) {
  return `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(address)}`;
}

export default function Home() {
  const [selectedNeed, setSelectedNeed] = useState<any>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [toastMessage, setToastMessage] = useState<string | null>(null)
  const { selectedMosque, setSelectedMosque } = useMosqueContext()
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedLocation, setSelectedLocation] = useState('')

  const handleNeedClick = (need: any) => {
    setSelectedNeed(need)
    setIsModalOpen(true)
  }

  const handleAddToMyMosque = (mosque: any) => {
    setSelectedMosque(mosque)
    setToastMessage(`${mosque.name} has been added to My Mosque`)
  }

  const filteredMosques = useMemo(() => {
    return mosques.filter(mosque => {
      const matchesSearch = mosque.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            mosque.location.toLowerCase().includes(searchQuery.toLowerCase())
      const matchesLocation = selectedLocation === '' || mosque.location.includes(selectedLocation)
      return matchesSearch && matchesLocation
    })
  }, [searchQuery, selectedLocation])

  const uniqueLocations = useMemo(() => {
    return Array.from(new Set(mosques.map(mosque => mosque.location)))
  }, [])

  return (
    <div className="container mx-auto py-8 px-4">
      <header className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4 text-olive-600">Mosque Support Platform</h1>
        <p className="text-xl text-gray-600 mb-8">Support your local mosque with one-off donations or monthly subscriptions</p>
        <div className="flex justify-center space-x-8">
          <div className="flex flex-col items-center">
            <CrescentMoon className="w-12 h-12 text-forestGreen-600 mb-2" />
            <span className="text-sm font-medium">Support Mosques</span>
          </div>
          <div className="flex flex-col items-center">
            <HeartHandshake className="w-12 h-12 text-forestGreen-600 mb-2" />
            <span className="text-sm font-medium">Community Impact</span>
          </div>
          <div className="flex flex-col items-center">
            <Landmark className="w-12 h-12 text-forestGreen-600 mb-2" />
            <span className="text-sm font-medium">Preserve Heritage</span>
          </div>
        </div>
      </header>
      <div className="mb-8 flex flex-col md:flex-row gap-4">
        <div className="relative flex-grow">
          <Input
            type="text"
            placeholder="Search mosques..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
        </div>
        <Select value={selectedLocation} onValueChange={setSelectedLocation}>
          <SelectTrigger className="w-full md:w-[200px]">
            <SelectValue placeholder="Filter by location" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Locations</SelectItem>
            {uniqueLocations.map((location) => (
              <SelectItem key={location} value={location}>{location}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredMosques.map((mosque) => (
          <Card key={mosque.id} className="flex flex-col overflow-hidden hover:shadow-lg transition-shadow duration-300 bg-white">
            <CardHeader className="pb-0">
              <CardTitle className="text-2xl">{mosque.name}</CardTitle>
              <CardDescription>
                {mosque.location} -{' '}
                <a
                  href={getDirectionsUrl(mosque.address)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 hover:underline"
                >
                  View Location
                </a>
              </CardDescription>
            </CardHeader>
            <CardContent className="flex-grow">
              <img 
                src={mosque.image || "/placeholder.svg"} 
                alt={mosque.name} 
                className="w-full h-48 object-cover rounded-md mb-4" 
              />
              <Tabs defaultValue="one-off" className="w-full">
                <TabsList className="grid w-full grid-cols-2 mb-4">
                  <TabsTrigger value="one-off">One-off Needs</TabsTrigger>
                  <TabsTrigger value="ongoing">Ongoing Needs</TabsTrigger>
                </TabsList>
                <TabsContent value="one-off">
                  <h3 className="font-semibold mb-2 text-lg">One-off Projects:</h3>
                  <ul className="space-y-4">
                    {safeArray(mosque.oneOffNeeds).map((need) => (
                      <li key={need.id} onClick={() => handleNeedClick(need)} className="cursor-pointer hover:bg-gray-50 p-2 rounded">
                        <div className="flex justify-between text-sm mb-1">
                          <span className="font-medium">{need.name}</span>
                          <span className="text-gray-600">£{need.raised} / £{need.price}</span>
                        </div>
                        <Progress value={(need.raised / need.price) * 100} className="h-2" />
                      </li>
                    ))}
                  </ul>
                </TabsContent>
                <TabsContent value="ongoing">
                  <h3 className="font-semibold mb-2 text-lg">Ongoing Needs:</h3>
                  <ul className="space-y-2">
                    {safeArray(mosque.ongoingNeeds).map((need) => (
                      <li key={need.id} onClick={() => handleNeedClick(need)} className="flex justify-between text-sm cursor-pointer hover:bg-gray-50 p-2 rounded">
                        <span className="font-medium">{need.name}</span>
                        <span className="text-gray-600">£{need.monthlyPrice}/month</span>
                      </li>
                    ))}
                  </ul>
                </TabsContent>
              </Tabs>
            </CardContent>
            <CardFooter className="flex flex-col">
              <div className="flex w-full mb-2">
                <Link href={`/mosque/${mosque.id}`} passHref className="w-1/2 mr-2">
                  <Button className="w-full bg-black hover:bg-gray-800 text-white">Support</Button>
                </Link>
                <Link href={`/mosque-profile/${mosque.id}`} passHref className="w-1/2 ml-2">
                  <Button variant="outline" className="w-full border-black text-black hover:bg-gray-100">View Profile</Button>
                </Link>
              </div>
              <Button 
                onClick={() => handleAddToMyMosque(mosque)} 
                className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
              >
                <PlusCircle className="w-4 h-4 mr-2" />
                Add to My Mosque
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
      <NeedDetailsModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        need={selectedNeed}
      />
      {toastMessage && (
        <Toast
          message={toastMessage}
          onClose={() => setToastMessage(null)}
        />
      )}
    </div>
  )
}

