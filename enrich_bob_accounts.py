import csv
import math
import re
import zipfile
from pathlib import Path
from xml.sax.saxutils import escape


INPUT_PATH = Path("/Users/eoinreddy/Downloads/Eoin _ BoB _ FY26 - report1772053439795.csv")
OUTPUT_CSV = Path("/Users/eoinreddy/Documents/New project/Eoin _ BoB _ FY26 - enriched.csv")
OUTPUT_XLSX = Path("/Users/eoinreddy/Documents/New project/Eoin _ BoB _ FY26 - enriched.xlsx")


COMPANY_DATA = {
    "Gentex Corporation": {
        "website": "https://www.gentex.com/",
        "summary": "Automotive and aerospace technology manufacturer known for connected-car electronics, dimmable glass and fire-protection products; brands include HomeLink and VOXX-related vehicle integrations.",
        "kw_ratio": 0.24,
        "eng_ratio": 0.11,
        "multiplier": 0.92,
    },
    "Lionbridge Technologies": {
        "website": "https://www.lionbridge.com/",
        "summary": "Global localization, AI data and translation-services company; core brands include Lionbridge Language Cloud and Lionbridge AI.",
        "kw_ratio": 0.72,
        "eng_ratio": 0.09,
        "multiplier": 1.28,
    },
    "Nuance Communications": {
        "website": "https://www.nuance.com/",
        "summary": "Speech AI and clinical-documentation software company owned by Microsoft; brands include Dragon, PowerScribe and DAX.",
        "kw_ratio": 0.78,
        "eng_ratio": 0.22,
        "multiplier": 1.34,
    },
    "Shaw Communications": {
        "website": "https://www.shaw.ca/",
        "summary": "Canadian telecom and broadband operator acquired by Rogers; Shaw consumer services now sit alongside Rogers and Freedom Mobile brands.",
        "kw_ratio": 0.48,
        "eng_ratio": 0.12,
        "multiplier": 1.18,
    },
    "Mercer LLC": {
        "website": "https://www.mercer.com/",
        "summary": "HR, benefits, wealth and consulting firm within Marsh McLennan; associated group brands include Mercer, Marsh, Guy Carpenter and Oliver Wyman.",
        "kw_ratio": 0.8,
        "eng_ratio": 0.07,
        "multiplier": 1.32,
    },
    "John Wiley & Sons, Inc.": {
        "website": "https://www.wiley.com/",
        "summary": "Academic publishing, research and professional-learning company; brands include Wiley, Hindawi and Wiley Online Library.",
        "kw_ratio": 0.76,
        "eng_ratio": 0.08,
        "multiplier": 1.27,
    },
    "New York Times": {
        "website": "https://www.nytco.com/",
        "summary": "News, media and subscription products company behind The New York Times, Wirecutter, The Athletic and NYT Games.",
        "kw_ratio": 0.74,
        "eng_ratio": 0.11,
        "multiplier": 1.31,
    },
    "AES Big Sky, L.L.C.": {
        "website": "https://www.aes.com/",
        "summary": "Power-generation and renewables operating entity within The AES Corporation, which develops utility, storage and energy-infrastructure assets.",
        "kw_ratio": 0.34,
        "eng_ratio": 0.12,
        "multiplier": 0.98,
    },
    "UNICEF": {
        "website": "https://www.unicef.org/",
        "summary": "UN agency focused on children's health, education and humanitarian response; operates through UNICEF national committees and country offices.",
        "kw_ratio": 0.62,
        "eng_ratio": 0.05,
        "multiplier": 1.12,
    },
    "Amp Agency": {
        "website": "https://www.ampagency.com/",
        "summary": "Digital marketing and creative agency serving brand clients across media, commerce and experience design; operates as AMP Agency.",
        "kw_ratio": 0.82,
        "eng_ratio": 0.07,
        "multiplier": 1.3,
    },
    "SGK": {
        "website": "https://www.sgkinc.com/",
        "summary": "Packaging, brand experience and content-production business within Matthews International; SGK works alongside Matthews Memorialization and Industrial Automation.",
        "kw_ratio": 0.66,
        "eng_ratio": 0.06,
        "multiplier": 1.15,
    },
    "BL Harbert": {
        "website": "https://www.blharbert.com/",
        "summary": "General contractor focused on large commercial, federal and international construction programs; operates under BL Harbert International.",
        "kw_ratio": 0.25,
        "eng_ratio": 0.07,
        "multiplier": 0.8,
    },
    "Cornerstone Building Brands": {
        "website": "https://www.cornerstonebuildingbrands.com/",
        "summary": "Exterior building-products manufacturer serving residential and commercial construction; brands include Ply Gem, MBCI and Metallic Building Systems.",
        "kw_ratio": 0.23,
        "eng_ratio": 0.08,
        "multiplier": 0.82,
    },
    "Packaging Corp of America": {
        "website": "https://www.packagingcorp.com/",
        "summary": "Containerboard and corrugated-packaging manufacturer operating mills and box plants across North America under the PCA brand.",
        "kw_ratio": 0.18,
        "eng_ratio": 0.06,
        "multiplier": 0.73,
    },
    "American Water Works": {
        "website": "https://www.amwater.com/",
        "summary": "Water and wastewater utility operator serving regulated and military systems; key brands include American Water and American Water Military Services Group.",
        "kw_ratio": 0.31,
        "eng_ratio": 0.09,
        "multiplier": 0.95,
    },
    "Hydro One": {
        "website": "https://www.hydroone.com/",
        "summary": "Ontario electricity transmission and distribution utility serving residential and industrial customers through Hydro One networks.",
        "kw_ratio": 0.3,
        "eng_ratio": 0.09,
        "multiplier": 0.95,
    },
    "NVR": {
        "website": "https://www.nvrinc.com/",
        "summary": "Homebuilder and mortgage company focused on U.S. residential communities; brands include Ryan Homes, NVHomes and Heartland Homes.",
        "kw_ratio": 0.2,
        "eng_ratio": 0.05,
        "multiplier": 0.78,
    },
    "Snap-on": {
        "website": "https://www.snapon.com/",
        "summary": "Tools, diagnostics and repair-information manufacturer for professional technicians; brands include Snap-on, Mitchell 1 and Norbar.",
        "kw_ratio": 0.24,
        "eng_ratio": 0.08,
        "multiplier": 0.87,
    },
    "Hubbell": {
        "website": "https://www.hubbell.com/",
        "summary": "Electrical and utility infrastructure manufacturer; portfolio spans Hubbell Utility Solutions and Hubbell Electrical Solutions brands.",
        "kw_ratio": 0.23,
        "eng_ratio": 0.09,
        "multiplier": 0.84,
    },
    "Asbury Automotive Group": {
        "website": "https://www.asburyauto.com/",
        "summary": "Auto retail and service group operating dealerships and digital retailing assets; brands include Asbury, Clicklane and Total Care Auto.",
        "kw_ratio": 0.22,
        "eng_ratio": 0.04,
        "multiplier": 0.82,
    },
    "Consolidated Edison": {
        "website": "https://www.conedison.com/",
        "summary": "Regulated electric, gas and steam utility serving New York-area customers through Con Edison and Orange & Rockland.",
        "kw_ratio": 0.31,
        "eng_ratio": 0.1,
        "multiplier": 0.96,
    },
    "FirstService Residential": {
        "website": "https://www.fsresidential.com/",
        "summary": "Property-management company for residential communities within FirstService Corporation; sister brands include FirstService Brands and Century Fire.",
        "kw_ratio": 0.36,
        "eng_ratio": 0.03,
        "multiplier": 0.98,
    },
    "Total Quality Logistics": {
        "website": "https://www.tql.com/",
        "summary": "Third-party logistics and freight brokerage company operating under the TQL brand across truckload and supply-chain services.",
        "kw_ratio": 0.38,
        "eng_ratio": 0.04,
        "multiplier": 0.96,
    },
    "Diversey": {
        "website": "https://diversey.com/",
        "summary": "Cleaning, hygiene and infection-prevention products company now part of Solenis; brands include TASKI, Suma and Oxivir.",
        "kw_ratio": 0.34,
        "eng_ratio": 0.07,
        "multiplier": 0.93,
    },
    "Altice USA": {
        "website": "https://www.alticeusa.com/",
        "summary": "Cable, broadband and mobile operator behind the Optimum brand; formerly also operated Suddenlink in the U.S. market.",
        "kw_ratio": 0.46,
        "eng_ratio": 0.12,
        "multiplier": 1.18,
    },
    "Univar Solutions Inc.": {
        "website": "https://www.univarsolutions.com/",
        "summary": "Global chemicals and ingredients distributor serving industrial and life-sciences customers under the Univar Solutions brand.",
        "kw_ratio": 0.3,
        "eng_ratio": 0.06,
        "multiplier": 0.9,
    },
    "Spartannash Company": {
        "website": "https://www.spartannash.com/",
        "summary": "Food wholesale distribution and grocery retailer; retail banners include Family Fare, Martin's Super Markets and D&W Fresh Market.",
        "kw_ratio": 0.19,
        "eng_ratio": 0.03,
        "multiplier": 0.74,
    },
    "Pactiv Evergreen Inc.": {
        "website": "https://pactivevergreen.com/",
        "summary": "Foodservice packaging and beverage-carton manufacturer; brands include Pactiv, Evergreen, Fabri-Kal and EarthChoice.",
        "kw_ratio": 0.18,
        "eng_ratio": 0.06,
        "multiplier": 0.73,
    },
    "The Parsons Corporation": {
        "website": "https://www.parsons.com/",
        "summary": "Engineering, defense, cyber and infrastructure contractor serving governments and critical-infrastructure clients under Parsons.",
        "kw_ratio": 0.68,
        "eng_ratio": 0.2,
        "multiplier": 1.18,
    },
    "Moog Inc.": {
        "website": "https://www.moog.com/",
        "summary": "Motion-control and precision-components manufacturer serving aerospace, defense and industrial markets under the Moog brand.",
        "kw_ratio": 0.28,
        "eng_ratio": 0.13,
        "multiplier": 0.9,
    },
    "West Fraser Mills Ltd": {
        "website": "https://www.westfraser.com/",
        "summary": "Wood-products and lumber producer with mills across North America and Europe; brands include West Fraser and Norbord legacy panels.",
        "kw_ratio": 0.14,
        "eng_ratio": 0.04,
        "multiplier": 0.68,
    },
    "Curtiss-Wright Corporation": {
        "website": "https://www.curtisswright.com/",
        "summary": "Defense, aerospace and industrial engineering company; portfolio includes Curtiss-Wright Defense Solutions and industrial control businesses.",
        "kw_ratio": 0.3,
        "eng_ratio": 0.14,
        "multiplier": 0.94,
    },
    "Rev Group, Inc.": {
        "website": "https://www.revgroup.com/",
        "summary": "Specialty vehicle manufacturer for fire, emergency, commercial and recreation markets; brands include E-ONE, Collins, Fleetwood RV and Blue Arc.",
        "kw_ratio": 0.18,
        "eng_ratio": 0.06,
        "multiplier": 0.74,
    },
    "Wabash National Corporation": {
        "website": "https://www.wabash.com/",
        "summary": "Transportation-equipment manufacturer building trailers, truck bodies and logistics solutions under Wabash and Trailers as a Service.",
        "kw_ratio": 0.2,
        "eng_ratio": 0.08,
        "multiplier": 0.78,
    },
    "Franklin Electric Co., Inc.": {
        "website": "https://www.franklinwater.com/",
        "summary": "Water and fueling systems manufacturer; brands include Franklin Electric, Little Giant, FPS and Fueling Systems.",
        "kw_ratio": 0.24,
        "eng_ratio": 0.09,
        "multiplier": 0.85,
    },
    "Chicago Transit Authority Inc.": {
        "website": "https://www.transitchicago.com/",
        "summary": "Public transit agency operating Chicago's rail and bus network under the CTA system brand.",
        "kw_ratio": 0.3,
        "eng_ratio": 0.07,
        "multiplier": 0.92,
    },
    "White Cap, L.P.": {
        "website": "https://www.whitecap.com/",
        "summary": "Specialty distributor of construction and industrial supplies serving contractors nationwide under the White Cap brand.",
        "kw_ratio": 0.2,
        "eng_ratio": 0.03,
        "multiplier": 0.76,
    },
    "Sun Chemical Corporation": {
        "website": "https://www.sunchemical.com/",
        "summary": "Printing inks, pigments and materials-science company owned by DIC Corporation; brands include Sun Chemical and SunJet.",
        "kw_ratio": 0.24,
        "eng_ratio": 0.08,
        "multiplier": 0.84,
    },
    "Sp Plus Corporation": {
        "website": "https://www.spplus.com/",
        "summary": "Parking, mobility and facility-services operator; brands include SP+, Metropolis integrations and Sphere commerce solutions.",
        "kw_ratio": 0.28,
        "eng_ratio": 0.05,
        "multiplier": 0.92,
    },
    "Gentherm Incorporated": {
        "website": "https://gentherm.com/",
        "summary": "Automotive thermal-management and medical patient-temperature technology company; brands include ClimateSense and WellSense.",
        "kw_ratio": 0.24,
        "eng_ratio": 0.12,
        "multiplier": 0.9,
    },
    "CDM Smith Inc": {
        "website": "https://www.cdmsmith.com/",
        "summary": "Engineering, environmental and construction-services firm serving water, transportation and public-sector clients under CDM Smith.",
        "kw_ratio": 0.63,
        "eng_ratio": 0.18,
        "multiplier": 1.1,
    },
    "Kenco Group": {
        "website": "https://www.kencogroup.com/",
        "summary": "Logistics, warehousing and transportation-services company operating Kenco, Kenco Engineering and material-handling solutions.",
        "kw_ratio": 0.26,
        "eng_ratio": 0.05,
        "multiplier": 0.88,
    },
    "Daymon Worldwide Inc.": {
        "website": "https://www.daymon.com/",
        "summary": "Private-brand consulting, merchandising and retail services business within Advantage Solutions; works alongside Advantage Sales and retail-agency brands.",
        "kw_ratio": 0.5,
        "eng_ratio": 0.04,
        "multiplier": 1.06,
    },
    "Msx International, Inc.": {
        "website": "https://www.msxi.com/",
        "summary": "Business-process outsourcing and consulting company for automotive and industrial clients under the MSX International brand.",
        "kw_ratio": 0.56,
        "eng_ratio": 0.06,
        "multiplier": 1.08,
    },
    "Republic Airways Inc.": {
        "website": "https://www.rjet.com/",
        "summary": "Regional airline operating feeder service for major carriers; flies under American Eagle, Delta Connection and United Express agreements.",
        "kw_ratio": 0.28,
        "eng_ratio": 0.08,
        "multiplier": 0.9,
    },
    "AmeriGas": {
        "website": "https://www.amerigas.com/",
        "summary": "Propane distribution company owned by UGI Corporation, serving residential and commercial customers under the AmeriGas brand.",
        "kw_ratio": 0.2,
        "eng_ratio": 0.03,
        "multiplier": 0.76,
    },
    "Electric Boat Corporation": {
        "website": "https://www.gdeb.com/",
        "summary": "Submarine design and shipbuilding company within General Dynamics; major programs include Virginia and Columbia-class boats.",
        "kw_ratio": 0.42,
        "eng_ratio": 0.19,
        "multiplier": 1.02,
    },
    "Hithink RoyalFlush Information Network Co. Ltd": {
        "website": "https://www.10jqka.com.cn/",
        "summary": "Chinese fintech and financial-information company behind the Tonghuashun and iFinD platforms for investors and institutions.",
        "kw_ratio": 0.74,
        "eng_ratio": 0.24,
        "multiplier": 1.3,
    },
    "Videotron Service Informatique Lt?©e": {
        "display_name": "Videotron Service Informatique Ltee",
        "website": "https://www.videotron.com/",
        "summary": "IT and telecom operating entity supporting Videotron's broadband, wireless and media services within Quebecor's telecom portfolio.",
        "kw_ratio": 0.46,
        "eng_ratio": 0.13,
        "multiplier": 1.15,
    },
    "Bell M?©dia Inc": {
        "display_name": "Bell Media Inc",
        "website": "https://www.bellmedia.ca/",
        "summary": "Canadian media company within BCE/Bell Canada; brands include CTV, Crave, TSN, RDS and iHeartRadio Canada.",
        "kw_ratio": 0.7,
        "eng_ratio": 0.08,
        "multiplier": 1.22,
    },
    "Rip City Management LLC": {
        "website": "https://www.nba.com/blazers/",
        "summary": "Business entity for the Portland Trail Blazers NBA franchise; associated brands include Trail Blazers, Rip City and Moda Center events.",
        "kw_ratio": 0.36,
        "eng_ratio": 0.04,
        "multiplier": 0.96,
    },
    "Sigma Engineered Solutions": {
        "website": "https://www.sigmaes.com/",
        "summary": "Precision metal and engineered-components manufacturer serving electrical, industrial and infrastructure markets under Sigma Engineered Solutions.",
        "kw_ratio": 0.22,
        "eng_ratio": 0.08,
        "multiplier": 0.82,
    },
    "Long & Foster Companies": {
        "website": "https://www.longandfoster.com/",
        "summary": "Residential real-estate brokerage, mortgage and title-services company owned by HomeServices of America, a Berkshire Hathaway affiliate.",
        "kw_ratio": 0.33,
        "eng_ratio": 0.03,
        "multiplier": 0.92,
    },
    "Mandelbaum Barrett": {
        "website": "https://mblawfirm.com/",
        "summary": "Law firm serving corporate, litigation, real-estate and private-client matters under the Mandelbaum Barrett brand.",
        "kw_ratio": 0.76,
        "eng_ratio": 0.02,
        "multiplier": 1.15,
    },
    "Wiley Accounting Certifications and Careers": {
        "website": "https://www.efficientlearning.com/",
        "summary": "Professional test-prep and accounting-learning business within Wiley; brands include Wiley Efficient Learning and CPAexcel.",
        "kw_ratio": 0.78,
        "eng_ratio": 0.06,
        "multiplier": 1.24,
    },
    "Red Apple Group": {
        "website": "https://www.redapplegroup.com/",
        "summary": "Holding company with energy, retail, real-estate and finance assets; associated brands include United Refining, Gristedes and D'Agostino.",
        "kw_ratio": 0.32,
        "eng_ratio": 0.04,
        "multiplier": 0.9,
    },
    "EllisDon": {
        "website": "https://www.ellisdon.com/",
        "summary": "Construction and project-delivery company active in building, infrastructure and facilities services under the EllisDon brand.",
        "kw_ratio": 0.28,
        "eng_ratio": 0.08,
        "multiplier": 0.86,
    },
    "Howard Hanna | Rand Realty": {
        "website": "https://www.howardhanna.com/",
        "summary": "Residential real-estate brokerage business within Howard Hanna Real Estate Services; Rand Realty operates as a regional brand in the network.",
        "kw_ratio": 0.34,
        "eng_ratio": 0.03,
        "multiplier": 0.93,
    },
    "Performance Contracting, Inc. (PCI)": {
        "website": "https://www.performancecontracting.com/",
        "summary": "Specialty contractor focused on insulation, interior systems, coatings and cleanroom work under the PCI brand.",
        "kw_ratio": 0.24,
        "eng_ratio": 0.06,
        "multiplier": 0.8,
    },
    "GP Strategies Corporation": {
        "website": "https://www.gpstrategies.com/",
        "summary": "Workforce transformation and learning-services company acquired by Learning Technologies Group; brands include GP Strategies and related LTG learning platforms.",
        "kw_ratio": 0.74,
        "eng_ratio": 0.07,
        "multiplier": 1.22,
    },
    "Employbridge": {
        "website": "https://www.employbridge.com/",
        "summary": "Industrial staffing and workforce-solutions company; brands include Select Staffing, ProLogistix, ResourceMFG and Staff Management.",
        "kw_ratio": 0.44,
        "eng_ratio": 0.03,
        "multiplier": 1.0,
    },
    "Pyramid Global Hospitality": {
        "website": "https://www.pyramidglobal.com/",
        "summary": "Hotel and resort management company operating branded and independent hospitality properties under Pyramid Global Hospitality.",
        "kw_ratio": 0.24,
        "eng_ratio": 0.03,
        "multiplier": 0.8,
    },
    "Kellermeyer Bergensons Services LLC": {
        "website": "https://www.kbs-services.com/",
        "summary": "Facility-services and contract-cleaning company serving retail and industrial sites under the KBS brand.",
        "kw_ratio": 0.2,
        "eng_ratio": 0.02,
        "multiplier": 0.74,
    },
    "YMCA of Greater Toronto": {
        "website": "https://www.ymcagta.org/",
        "summary": "Nonprofit delivering community, fitness, youth and employment programs as part of the YMCA network in Greater Toronto.",
        "kw_ratio": 0.42,
        "eng_ratio": 0.03,
        "multiplier": 1.0,
    },
    "Subaru of Indiana Automotive, Inc.": {
        "website": "https://www.subaru-sia.com/",
        "summary": "U.S. vehicle manufacturing plant producing Subaru models for Subaru Corporation; operates as Subaru of Indiana Automotive.",
        "kw_ratio": 0.16,
        "eng_ratio": 0.08,
        "multiplier": 0.72,
    },
    "M3, Inc": {
        "website": "https://corporate.m3.com/en/",
        "summary": "Healthcare information, digital services and market-research company; group brands include M3, MDLinx, Quantia and other physician-network assets.",
        "kw_ratio": 0.76,
        "eng_ratio": 0.18,
        "multiplier": 1.28,
    },
    "Alabama Power Company": {
        "website": "https://www.alabamapower.com/",
        "summary": "Electric utility serving Alabama as a Southern Company subsidiary alongside Georgia Power, Mississippi Power and Southern Power.",
        "kw_ratio": 0.29,
        "eng_ratio": 0.09,
        "multiplier": 0.94,
    },
    "Travel + Leisure Co.": {
        "website": "https://www.travelandleisureco.com/",
        "summary": "Vacation ownership and travel-membership company; brands include Club Wyndham, WorldMark by Wyndham, Margaritaville Vacation Club and Travel + Leisure GO.",
        "kw_ratio": 0.34,
        "eng_ratio": 0.05,
        "multiplier": 0.97,
    },
    "Change Healthcare Inc.": {
        "website": "https://www.changehealthcare.com/",
        "summary": "Healthcare payments, claims and clinical-interoperability technology company now part of Optum within UnitedHealth Group.",
        "kw_ratio": 0.72,
        "eng_ratio": 0.18,
        "multiplier": 1.27,
    },
    "Canon U.S.A., Inc.": {
        "website": "https://www.usa.canon.com/",
        "summary": "U.S. sales and services arm of Canon Inc. across imaging, print, medical and industrial products under Canon brands.",
        "kw_ratio": 0.38,
        "eng_ratio": 0.08,
        "multiplier": 1.0,
    },
    "ESAB Corporation": {
        "website": "https://www.esab.com/",
        "summary": "Welding, cutting and fabrication-equipment company; portfolio includes ESAB, Victor, Tweco and other fabrication brands.",
        "kw_ratio": 0.24,
        "eng_ratio": 0.09,
        "multiplier": 0.84,
    },
    "Simplex Time Recorder LLC": {
        "website": "https://www.str-llc.com/",
        "summary": "Timekeeping, labor-management and payroll-solutions provider operating as Simplex Time Recorder / STR for workforce operations teams.",
        "kw_ratio": 0.46,
        "eng_ratio": 0.08,
        "multiplier": 1.08,
    },
    "Meritage Hospitality Group Inc.": {
        "website": "https://www.meritagehospitality.com/",
        "summary": "Restaurant franchise operator focused primarily on Wendy's locations through Meritage Hospitality and related foodservice entities.",
        "kw_ratio": 0.18,
        "eng_ratio": 0.02,
        "multiplier": 0.72,
    },
    "FIME": {
        "website": "https://www.fime.com/",
        "summary": "Payments consulting, testing and certification company helping banks, networks and merchants deploy secure payment systems under Fime.",
        "kw_ratio": 0.74,
        "eng_ratio": 0.16,
        "multiplier": 1.22,
    },
    "Longyuan Canada Renewables Ltd.": {
        "website": "https://www.clypg.com.cn/",
        "summary": "Canadian renewables operating business tied to China Longyuan Power Group, a major wind and renewable-energy developer.",
        "kw_ratio": 0.32,
        "eng_ratio": 0.12,
        "multiplier": 0.97,
    },
    "CSRA": {
        "website": "https://www.gdit.com/",
        "summary": "Former government IT integrator whose operations were acquired by General Dynamics Information Technology; now aligned with GDIT services.",
        "kw_ratio": 0.68,
        "eng_ratio": 0.15,
        "multiplier": 1.14,
    },
    "Wackenhut Correctional Facility": {
        "website": "https://www.geogroup.com/",
        "summary": "Legacy Wackenhut corrections business now associated with The GEO Group, which operates detention, reentry and monitoring services.",
        "kw_ratio": 0.18,
        "eng_ratio": 0.02,
        "multiplier": 0.65,
    },
    "SCI Direct": {
        "website": "https://www.sci-corp.com/",
        "summary": "Direct-to-consumer funeral and cemetery planning activity associated with Service Corporation International, owner of Dignity Memorial brands.",
        "kw_ratio": 0.24,
        "eng_ratio": 0.03,
        "multiplier": 0.75,
    },
    "Elster Holdings Netherlands B.V.": {
        "website": "https://www.honeywellsmartenergy.com/",
        "summary": "Smart metering and utility-technology business linked to Elster, now part of Honeywell's smart energy portfolio.",
        "kw_ratio": 0.34,
        "eng_ratio": 0.12,
        "multiplier": 0.98,
    },
    "ABC Tech": {
        "website": "",
        "summary": "Exact legal entity match was not clear from the source file; verify the company website and parent-brand details before using this row for outreach.",
        "kw_ratio": 0.45,
        "eng_ratio": 0.08,
        "multiplier": 0.85,
    },
    "Nikkiso": {
        "website": "https://www.nikkiso.com/",
        "summary": "Industrial, medical and cryogenic equipment manufacturer; key segments include Nikkiso Clean Energy & Industrial Gases and Medical.",
        "kw_ratio": 0.28,
        "eng_ratio": 0.12,
        "multiplier": 0.92,
    },
}


NEW_COLUMNS = [
    "Company Summary",
    "Est. knowledge workers",
    "Estimated Engineer count",
    "Propensity Tier",
    "Website",
]


def clean_number(value):
    text = (value or "").strip()
    if not text or text == "#ERROR!":
        return 0.0
    text = text.replace(",", "")
    try:
        return float(text)
    except ValueError:
        return 0.0


def score_row(row, profile, est_kw, est_eng):
    free_users = clean_number(row.get("ChatGPT Free Users on Account"))
    team_users = clean_number(row.get("ChatGPT Team Users on Account"))
    activated = clean_number(row.get("ChatGPT Seats Activated (Enterprise)"))
    mau = clean_number(row.get("ChatGPT MAU"))
    wau = clean_number(row.get("ChatGPT WAU"))
    arr = clean_number(row.get("ChatGPT ARR (Total)"))
    api_arr = clean_number(row.get("API ARR (Total)"))
    priority = (row.get("Priority Tier") or "").strip().upper()
    priority_bonus = {"P1": 12, "P2": 6}.get(priority, 0)
    signal = (
        free_users
        + (team_users * 6)
        + (activated * 4)
        + mau
        + (wau * 0.5)
        + (arr / 1500)
        + (api_arr / 1000)
        + (est_kw / 40)
        + (est_eng / 25)
    )
    return (math.log1p(signal) * 20 * profile["multiplier"]) + priority_bonus


def normalize_formula_text(text):
    return text.replace('"', '""')


def col_name(index):
    chars = []
    while index > 0:
        index, rem = divmod(index - 1, 26)
        chars.append(chr(65 + rem))
    return "".join(reversed(chars))


def inline_string_cell(ref, value, style=None):
    style_attr = f' s="{style}"' if style is not None else ""
    return f'<c r="{ref}" t="inlineStr"{style_attr}><is><t xml:space="preserve">{escape(value)}</t></is></c>'


def number_cell(ref, value, style=None):
    style_attr = f' s="{style}"' if style is not None else ""
    return f'<c r="{ref}"{style_attr}><v>{value}</v></c>'


def formula_cell(ref, formula, value, style=None):
    style_attr = f' s="{style}"' if style is not None else ""
    return f'<c r="{ref}" t="str"{style_attr}><f>{escape(formula)}</f><v>{escape(value)}</v></c>'


def worksheet_xml(headers, rows):
    cols = []
    for idx, header in enumerate(headers, 1):
        width = max(len(header), 14)
        if header == "Account Name":
            width = 30
        elif header == "Company Summary":
            width = 90
        elif header == "Website":
            width = 32
        cols.append(f'<col min="{idx}" max="{idx}" width="{width}" customWidth="1"/>')

    sheet_rows = []
    header_cells = []
    for idx, header in enumerate(headers, 1):
        header_cells.append(inline_string_cell(f"{col_name(idx)}1", header, style=1))
    sheet_rows.append(f'<row r="1" spans="1:{len(headers)}">{"".join(header_cells)}</row>')

    for row_num, row in enumerate(rows, 2):
        cells = []
        for idx, header in enumerate(headers, 1):
            ref = f"{col_name(idx)}{row_num}"
            value = row[header]
            if header == "Account Name" and row.get("Website"):
                formula = f'HYPERLINK("{normalize_formula_text(row["Website"])}","{normalize_formula_text(value)}")'
                cells.append(formula_cell(ref, formula, value, style=2))
                continue
            if isinstance(value, int):
                cells.append(number_cell(ref, value))
            else:
                text = "" if value is None else str(value)
                if re.fullmatch(r"-?\d+", text):
                    cells.append(number_cell(ref, int(text)))
                else:
                    cells.append(inline_string_cell(ref, text))
        sheet_rows.append(f'<row r="{row_num}" spans="1:{len(headers)}">{"".join(cells)}</row>')

    dimension = f"A1:{col_name(len(headers))}{len(rows) + 1}"
    return f'''<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<worksheet xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main" xmlns:r="http://schemas.openxmlformats.org/officeDocument/2006/relationships">
  <dimension ref="{dimension}"/>
  <sheetViews>
    <sheetView workbookViewId="0">
      <pane ySplit="1" topLeftCell="A2" activePane="bottomLeft" state="frozen"/>
    </sheetView>
  </sheetViews>
  <sheetFormatPr defaultRowHeight="15"/>
  <cols>{"".join(cols)}</cols>
  <sheetData>{"".join(sheet_rows)}</sheetData>
  <autoFilter ref="{dimension}"/>
</worksheet>'''


def workbook_xml():
    return '''<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<workbook xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main" xmlns:r="http://schemas.openxmlformats.org/officeDocument/2006/relationships">
  <sheets>
    <sheet name="Accounts" sheetId="1" r:id="rId1"/>
  </sheets>
</workbook>'''


def workbook_rels_xml():
    return '''<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">
  <Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/worksheet" Target="worksheets/sheet1.xml"/>
  <Relationship Id="rId2" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/styles" Target="styles.xml"/>
</Relationships>'''


def rels_xml():
    return '''<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">
  <Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/officeDocument" Target="xl/workbook.xml"/>
</Relationships>'''


def content_types_xml():
    return '''<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Types xmlns="http://schemas.openxmlformats.org/package/2006/content-types">
  <Default Extension="rels" ContentType="application/vnd.openxmlformats-package.relationships+xml"/>
  <Default Extension="xml" ContentType="application/xml"/>
  <Override PartName="/xl/workbook.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet.main+xml"/>
  <Override PartName="/xl/worksheets/sheet1.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.worksheet+xml"/>
  <Override PartName="/xl/styles.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.styles+xml"/>
  <Override PartName="/docProps/core.xml" ContentType="application/vnd.openxmlformats-package.core-properties+xml"/>
  <Override PartName="/docProps/app.xml" ContentType="application/vnd.openxmlformats-officedocument.extended-properties+xml"/>
</Types>'''


def styles_xml():
    return '''<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<styleSheet xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main">
  <fonts count="3">
    <font><sz val="11"/><name val="Calibri"/><family val="2"/></font>
    <font><b/><sz val="11"/><name val="Calibri"/><family val="2"/></font>
    <font><sz val="11"/><color rgb="FF0563C1"/><u/><name val="Calibri"/><family val="2"/></font>
  </fonts>
  <fills count="2">
    <fill><patternFill patternType="none"/></fill>
    <fill><patternFill patternType="gray125"/></fill>
  </fills>
  <borders count="1">
    <border><left/><right/><top/><bottom/><diagonal/></border>
  </borders>
  <cellStyleXfs count="1">
    <xf numFmtId="0" fontId="0" fillId="0" borderId="0"/>
  </cellStyleXfs>
  <cellXfs count="3">
    <xf numFmtId="0" fontId="0" fillId="0" borderId="0" xfId="0"/>
    <xf numFmtId="0" fontId="1" fillId="0" borderId="0" xfId="0" applyFont="1"/>
    <xf numFmtId="0" fontId="2" fillId="0" borderId="0" xfId="0" applyFont="1"/>
  </cellXfs>
  <cellStyles count="1">
    <cellStyle name="Normal" xfId="0" builtinId="0"/>
  </cellStyles>
</styleSheet>'''


def core_xml():
    return '''<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<cp:coreProperties xmlns:cp="http://schemas.openxmlformats.org/package/2006/metadata/core-properties" xmlns:dc="http://purl.org/dc/elements/1.1/" xmlns:dcterms="http://purl.org/dc/terms/" xmlns:dcmitype="http://purl.org/dc/dcmitype/" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance">
  <dc:creator>Codex</dc:creator>
  <cp:lastModifiedBy>Codex</cp:lastModifiedBy>
  <dcterms:created xsi:type="dcterms:W3CDTF">2026-02-26T00:00:00Z</dcterms:created>
  <dcterms:modified xsi:type="dcterms:W3CDTF">2026-02-26T00:00:00Z</dcterms:modified>
</cp:coreProperties>'''


def app_xml():
    return '''<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Properties xmlns="http://schemas.openxmlformats.org/officeDocument/2006/extended-properties" xmlns:vt="http://schemas.openxmlformats.org/officeDocument/2006/docPropsVTypes">
  <Application>Codex</Application>
</Properties>'''


def write_xlsx(headers, rows):
    with zipfile.ZipFile(OUTPUT_XLSX, "w", compression=zipfile.ZIP_DEFLATED) as zf:
        zf.writestr("[Content_Types].xml", content_types_xml())
        zf.writestr("_rels/.rels", rels_xml())
        zf.writestr("xl/workbook.xml", workbook_xml())
        zf.writestr("xl/_rels/workbook.xml.rels", workbook_rels_xml())
        zf.writestr("xl/worksheets/sheet1.xml", worksheet_xml(headers, rows))
        zf.writestr("xl/styles.xml", styles_xml())
        zf.writestr("docProps/core.xml", core_xml())
        zf.writestr("docProps/app.xml", app_xml())


def main():
    with INPUT_PATH.open(newline="", encoding="utf-8-sig") as infile:
        reader = csv.DictReader(infile)
        rows = list(reader)

    missing = [row["Account Name"] for row in rows if row["Account Name"] not in COMPANY_DATA]
    if missing:
        raise KeyError(f"Missing company metadata for: {missing}")

    enriched_rows = []
    scored_rows = []
    for row in rows:
        profile = COMPANY_DATA[row["Account Name"]]
        employees = int(clean_number(row.get("Employees")))
        est_kw = round(employees * profile["kw_ratio"])
        est_eng = round(employees * profile["eng_ratio"])
        score = score_row(row, profile, est_kw, est_eng)
        scored_rows.append((score, row["Account Name"]))
        enriched = dict(row)
        if profile.get("display_name"):
            enriched["Account Name"] = profile["display_name"]
        enriched["Company Summary"] = profile["summary"]
        enriched["Est. knowledge workers"] = est_kw
        enriched["Estimated Engineer count"] = est_eng
        enriched["Website"] = profile["website"]
        enriched["_score"] = score
        enriched["_source_account_name"] = row["Account Name"]
        enriched_rows.append(enriched)

    eligible_top_15 = [
        (score, name)
        for score, name in scored_rows
        if COMPANY_DATA[name]["kw_ratio"] >= 0.4
    ]
    top_15 = {name for _, name in sorted(eligible_top_15, reverse=True)[:15]}
    tier_3_cutoff = sorted(score for score, _ in scored_rows)[max(0, math.floor(len(scored_rows) * 0.35) - 1)]

    for row in enriched_rows:
        score = row["_score"]
        if row["_source_account_name"] in top_15:
            row["Propensity Tier"] = "Top 15"
        elif score <= tier_3_cutoff:
            row["Propensity Tier"] = "Tier 3"
        else:
            row["Propensity Tier"] = "Tier 2"

    headers = list(rows[0].keys()) + NEW_COLUMNS
    with OUTPUT_CSV.open("w", newline="", encoding="utf-8") as outfile:
        writer = csv.DictWriter(outfile, fieldnames=headers)
        writer.writeheader()
        for row in enriched_rows:
            writer.writerow({header: row.get(header, "") for header in headers})

    write_xlsx(headers, enriched_rows)


if __name__ == "__main__":
    main()
