import { useState } from 'react';
import ImageSlider from '../components/ImageSlider';
import SchemeCard from '../components/SchemeCard';

const Schemes = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState(null);

  const schemeCategories = [
    {
      title: "Housing Schemes",
      schemes: [
        {
          title: "Pradhan Mantri Awas Yojana (PMAY)",
          description: "Housing for All by 2022",
          benefits: [
            "Interest subsidy on home loans up to 6.5%",
            "Affordable housing in urban areas",
            "Rural housing assistance",
            "Credit-linked subsidy for EWS/LIG/MIG"
          ],
          eligibility: [
            "Economically Weaker Section (EWS)",
            "Lower Income Group (LIG)",
            "Middle Income Group (MIG)",
            "No pucca house in any part of India"
          ],
          documents: [
            "Aadhaar Card",
            "Income Certificate",
            "Bank Account Details",
            "Property Documents (if applicable)"
          ]
        },
        {
          title: "Indira Awas Yojana (IAY)",
          description: "Rural housing scheme for BPL families",
          benefits: [
            "Financial assistance for house construction",
            "Support for SC/ST and minorities",
            "Additional assistance for disabled persons"
          ],
          eligibility: [
            "Below Poverty Line (BPL) families",
            "SC/ST households",
            "Minority communities",
            "Disabled persons"
          ],
          documents: [
            "BPL Certificate",
            "Aadhaar Card",
            "Bank Account Details",
            "Land Documents"
          ]
        }
      ]
    },
    {
      title: "Energy Schemes",
      schemes: [
        {
          title: "Pradhan Mantri Ujjwala Yojana (PMUY)",
          description: "Free LPG connections to women from BPL households",
          benefits: [
            "Free LPG connection with first refill",
            "Financial support for first refill",
            "Health benefits from clean cooking fuel",
            "Empowerment of women through clean energy",
            "Reduced indoor air pollution"
          ],
          eligibility: [
            "Women from BPL households",
            "SC/ST households",
            "Most Backward Classes (MBC)",
            "Forest dwellers",
            "Residents of islands and river islands"
          ],
          documents: [
            "Aadhaar Card",
            "BPL Certificate",
            "Bank Account Details",
            "Address Proof",
            "Passport size photograph"
          ]
        }
      ]
    },
    {
      title: "Health Schemes",
      schemes: [
        {
          title: "Ayushman Bharat - Pradhan Mantri Jan Arogya Yojana (AB-PMJAY)",
          description: "Health coverage for poor and vulnerable",
          benefits: [
            "Health coverage up to ₹5 lakhs per family per year",
            "Coverage for secondary and tertiary care",
            "Cashless treatment at empaneled hospitals",
            "No restriction on family size"
          ],
          eligibility: [
            "Socio-Economic Caste Census (SECC) database",
            "Antyodaya Anna Yojana (AAY) families",
            "Rashtriya Swasthya Bima Yojana (RSBY) beneficiaries"
          ],
          documents: [
            "Aadhaar Card",
            "Ration Card",
            "Income Certificate",
            "Caste Certificate (if applicable)"
          ]
        },
        {
          title: "Pradhan Mantri Swasthya Suraksha Yojana (PMSSY)",
          description: "Healthcare infrastructure development",
          benefits: [
            "New AIIMS-like institutions",
            "Upgradation of existing medical colleges",
            "Specialized healthcare services",
            "Medical education opportunities"
          ],
          eligibility: [
            "All citizens",
            "Medical institutions",
            "Healthcare providers"
          ],
          documents: [
            "Institution Registration",
            "Medical License",
            "Infrastructure Details"
          ]
        }
      ]
    },
    {
      title: "Food Security Schemes",
      schemes: [
        {
          title: "National Food Security Act (NFSA)",
          description: "Food security for all",
          benefits: [
            "5 kg of foodgrains per person per month",
            "Rice at ₹3/kg",
            "Wheat at ₹2/kg",
            "Coarse grains at ₹1/kg"
          ],
          eligibility: [
            "Priority households",
            "Antyodaya Anna Yojana (AAY) families",
            "State-specific eligibility criteria"
          ],
          documents: [
            "Ration Card",
            "Aadhaar Card",
            "Address Proof"
          ]
        },
        {
          title: "Antyodaya Anna Yojana (AAY)",
          description: "Food security for poorest of the poor",
          benefits: [
            "35 kg of foodgrains per family per month",
            "Rice at ₹3/kg",
            "Wheat at ₹2/kg",
            "Coarse grains at ₹1/kg"
          ],
          eligibility: [
            "Landless agricultural laborers",
            "Marginal farmers",
            "Rural artisans/craftsmen",
            "Destitute and homeless"
          ],
          documents: [
            "BPL Certificate",
            "Ration Card",
            "Aadhaar Card"
          ]
        }
      ]
    },
    {
      title: "Education Schemes",
      schemes: [
        {
          title: "Beti Bachao Beti Padhao",
          description: "Save the girl child, educate the girl child",
          benefits: [
            "Financial incentives for girl child education",
            "Awareness campaigns",
            "Skill development programs",
            "Scholarships for higher education"
          ],
          eligibility: [
            "Girl students",
            "Families with girl children",
            "Educational institutions"
          ],
          documents: [
            "Birth Certificate",
            "School/College ID",
            "Bank Account Details",
            "Parent's Aadhaar Card"
          ]
        },
        {
          title: "Pradhan Mantri Kaushal Vikas Yojana (PMKVY)",
          description: "Skill development for youth",
          benefits: [
            "Free skill training",
            "Certification",
            "Placement assistance",
            "Financial rewards for certification"
          ],
          eligibility: [
            "Unemployed youth",
            "School/college dropouts",
            "No age limit for certain courses"
          ],
          documents: [
            "Aadhaar Card",
            "Educational Certificates",
            "Bank Account Details"
          ]
        }
      ]
    },
    {
      title: "Financial Inclusion Schemes",
      schemes: [
        {
          title: "Pradhan Mantri Jan Dhan Yojana (PMJDY)",
          description: "Financial inclusion for all",
          benefits: [
            "Zero balance bank account",
            "RuPay debit card",
            "Accident insurance of ₹2 lakhs",
            "Overdraft facility up to ₹10,000"
          ],
          eligibility: [
            "All Indian citizens",
            "No minimum balance requirement",
            "No age limit"
          ],
          documents: [
            "Aadhaar Card",
            "PAN Card (if available)",
            "Address Proof"
          ]
        },
        {
          title: "Pradhan Mantri Mudra Yojana (PMMY)",
          description: "Micro financing for small businesses",
          benefits: [
            "Loans up to ₹10 lakhs",
            "No collateral required",
            "Low interest rates",
            "Support for micro enterprises"
          ],
          eligibility: [
            "Small business owners",
            "Micro enterprises",
            "Startups",
            "Self-employed individuals"
          ],
          documents: [
            "Business Plan",
            "Bank Statements",
            "Identity Proof",
            "Address Proof"
          ]
        }
      ]
    }
  ];

  const handleSearch = (query) => {
    setSearchQuery(query);
    
    if (!query.trim()) {
      setSearchResults(null);
      return;
    }

    const searchTerms = query.toLowerCase().split(' ');
    const allSchemes = schemeCategories.flatMap(category => 
      category.schemes.map(scheme => ({
        ...scheme,
        category: category.title
      }))
    );

    const rankedSchemes = allSchemes.map(scheme => {
      let score = 0;
      const searchableText = [
        scheme.title,
        scheme.description,
        ...scheme.benefits,
        ...scheme.eligibility,
        scheme.category
      ].join(' ').toLowerCase();

      searchTerms.forEach(term => {
        // Title matches get highest score
        if (scheme.title.toLowerCase().includes(term)) score += 5;
        // Description matches get high score
        if (scheme.description.toLowerCase().includes(term)) score += 3;
        // Benefits and eligibility matches get medium score
        if (scheme.benefits.some(b => b.toLowerCase().includes(term))) score += 2;
        if (scheme.eligibility.some(e => e.toLowerCase().includes(term))) score += 2;
        // Category matches get low score
        if (scheme.category.toLowerCase().includes(term)) score += 1;
      });

      return { ...scheme, score };
    }).filter(scheme => scheme.score > 0)
      .sort((a, b) => b.score - a.score);

    setSearchResults(rankedSchemes);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <ImageSlider />
      
      <div className="container mx-auto px-6 py-12">
        <h1 className="text-4xl font-bold text-gray-800 mb-8 text-center">Government Schemes</h1>
        
        {/* Search Bar */}
        <div className="max-w-2xl mx-auto mb-12">
          <div className="relative">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => handleSearch(e.target.value)}
              placeholder="Search for schemes (e.g., housing, education, health)..."
              className="w-full px-6 py-4 text-lg border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
            <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
              <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          </div>
        </div>

        {/* Search Results or Categories */}
        {searchResults ? (
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">
              Search Results ({searchResults.length})
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {searchResults.map((scheme, index) => (
                <div key={index} className="relative">
                  <div className="absolute -top-2 -right-2 bg-blue-500 text-white px-3 py-1 rounded-full text-sm">
                    {scheme.category}
                  </div>
                  <SchemeCard scheme={scheme} />
                </div>
              ))}
            </div>
          </div>
        ) : (
          schemeCategories.map((category, categoryIndex) => (
            <div key={categoryIndex} className="mb-12">
              <h2 className="text-3xl font-bold text-gray-800 mb-6">{category.title}</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {category.schemes.map((scheme, schemeIndex) => (
                  <SchemeCard key={schemeIndex} scheme={scheme} />
                ))}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Schemes; 