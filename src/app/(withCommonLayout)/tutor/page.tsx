"use client";

import { useState, useEffect } from "react";
import { getAllTutorProfileInfo } from "@/services/Profile";
import Image from "next/image";
import { FaStar, FaMapMarkerAlt, FaClock, FaBookOpen, FaSearch, FaFilter } from "react-icons/fa";
import PrimaryButton from "@/components/shared/PrimaryButton";
import Link from "next/link";
import NMContainer from "@/components/ui/core/NMContainer";
import Banner from "@/components/shared/banner";


interface User {
  _id: string;
  name: string;
  email: string;
  role: string;
  status: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

interface Review {
  studentId: User;
  comment: string;
  createdAt: string;
  _id: string;
}

interface Rates {
  discount: number;
  hourlyRate: number;
}

interface TutorProfile {
  rates: Rates;
  _id: string;
  userId: User;
  image: string;
  subjects: string[];
  role: string;
  ratings: number;
  requestRole: string;
  isVerified: boolean;
  callToAction: null | string;
  availability: string[];
  reviews: Review[];
  createdAt: string;
  updatedAt: string;
  __v: number;
  bio: string;
  experience: number;
  location?: string;
}

const TutorPage = () => {
  const [tutors, setTutors] = useState<TutorProfile[]>([]);
  const [filteredTutors, setFilteredTutors] = useState<TutorProfile[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showFilters, setShowFilters] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const [subjectFilter, setSubjectFilter] = useState("");
  const [ratingFilter, setRatingFilter] = useState("");
  const [rateFilter, setRateFilter] = useState("");
  const [availabilityFilter, setAvailabilityFilter] = useState("");
  const [locationFilter, setLocationFilter] = useState("");

  const [sortOption, setSortOption] = useState("relevance");

  const uniqueSubjects = Array.from(
    new Set(
      tutors.flatMap((tutor) => tutor.subjects).filter((subject) => subject)
    )
  );


  const uniqueAvailability = Array.from(
    new Set(
      tutors.flatMap((tutor) => tutor.availability).filter((avail) => avail)
    )
  );

  const uniqueLocations = Array.from(
    new Set(
      tutors.map((tutor) => tutor.location).filter((location) => location)
    )
  );

  useEffect(() => {
    const fetchTutors = async () => {
      try {
        setLoading(true);
        const response = await getAllTutorProfileInfo();
        console.log("Tutor data:", response);

        const tutorProfiles = response.data || [];
        setTutors(tutorProfiles);
        setFilteredTutors(tutorProfiles);
      } catch (err) {
        console.error("Error fetching tutors:", err);
        setError("Failed to load tutor profiles");
      } finally {
        setLoading(false);
      }
    };

    fetchTutors();
  }, []);

  useEffect(() => {
    let results = [...tutors];


    if (searchTerm) {
      results = results.filter((tutor) =>
        tutor.userId.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        tutor.subjects.some((subject) =>
          subject.toLowerCase().includes(searchTerm.toLowerCase())
        )
      );
    }


    if (subjectFilter) {
      results = results.filter((tutor) =>
        tutor.subjects.some((subject) =>
          subject.toLowerCase().includes(subjectFilter.toLowerCase())
        )
      );
    }


    if (ratingFilter) {
      const minRating = parseFloat(ratingFilter);
      results = results.filter((tutor) => tutor.ratings >= minRating);
    }


    if (rateFilter) {
      const [min, max] = rateFilter.split("-").map(Number);
      results = results.filter((tutor) => {
        const rate = tutor.rates.hourlyRate;
        return rate >= min && (max ? rate <= max : true);
      });
    }


    if (availabilityFilter) {
      results = results.filter((tutor) =>
        tutor.availability.includes(availabilityFilter)
      );
    }


    if (locationFilter) {
      results = results.filter((tutor) =>
        tutor.location?.toLowerCase().includes(locationFilter.toLowerCase())
      );
    }


    switch (sortOption) {
      case "rating":
        results.sort((a, b) => b.ratings - a.ratings);
        break;
      case "price":
        results.sort((a, b) => a.rates.hourlyRate - b.rates.hourlyRate);
        break;
      case "priceDesc":
        results.sort((a, b) => b.rates.hourlyRate - a.rates.hourlyRate);
        break;
      case "recency":
        results.sort(
          (a, b) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
        break;
      case "relevance":
      default:
        break;
    }

    setFilteredTutors(results);
  }, [
    tutors,
    searchTerm,
    subjectFilter,
    ratingFilter,
    rateFilter,
    availabilityFilter,
    locationFilter,
    sortOption,
  ]);

  const clearAllFilters = () => {
    setSearchTerm("");
    setSubjectFilter("");
    setRatingFilter("");
    setRateFilter("");
    setAvailabilityFilter("");
    setLocationFilter("");
    setSortOption("relevance");
  };

  const hasActiveFilters = searchTerm || subjectFilter || ratingFilter || rateFilter || availabilityFilter || locationFilter;

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <NMContainer>
          <Banner title="Find a Tutor" path="Home -> Tutor" />
        </NMContainer>
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50">
        <NMContainer>
          <Banner title="Find a Tutor" path="Home -> Tutor" />
        </NMContainer>
        <div className="container mx-auto px-4 py-8">
          <div className="text-center py-12">
            <div className="text-red-500 text-lg mb-4">{error}</div>
            <button
              onClick={() => window.location.reload()}
              className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
            >
              Try Again
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <NMContainer>
        <Banner title="Find a Tutor" path="Home -> Tutor" />
      </NMContainer>

      <div className="container mx-auto px-4 py-8">
        {/* Header Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Find Your Perfect Tutor
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Connect with experienced tutors who can help you achieve your learning goals
          </p>
        </div>

        {/* Search and Filter Section */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          {/* Search Bar */}
          <div className="relative mb-6">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FaSearch className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search tutors by name or subject..."
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          {/* Filter Toggle */}
          <div className="flex justify-between items-center mb-4">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition"
            >
              <FaFilter className="h-4 w-4" />
              {showFilters ? "Hide Filters" : "Show Filters"}
            </button>
            
            <div className="flex items-center gap-4">
              <span className="text-sm text-gray-600">
                {filteredTutors.length} tutors found
              </span>
              {hasActiveFilters && (
                <button
                  onClick={clearAllFilters}
                  className="text-sm text-blue-600 hover:text-blue-700 underline"
                >
                  Clear all filters
                </button>
              )}
            </div>
          </div>

          {/* Filters */}
          {showFilters && (
            <div className="border-t pt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {/* Subject Filter */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Subject
                  </label>
                  <select
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    value={subjectFilter}
                    onChange={(e) => setSubjectFilter(e.target.value)}
                  >
                    <option value="">All Subjects</option>
                    {uniqueSubjects.map((subject, index) => (
                      <option key={index} value={subject}>
                        {subject}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Rating Filter */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Minimum Rating
                  </label>
                  <select
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    value={ratingFilter}
                    onChange={(e) => setRatingFilter(e.target.value)}
                  >
                    <option value="">Any Rating</option>
                    <option value="4.5">4.5+ Stars</option>
                    <option value="4">4+ Stars</option>
                    <option value="3.5">3.5+ Stars</option>
                    <option value="3">3+ Stars</option>
                  </select>
                </div>

                {/* Rate Filter */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Hourly Rate
                  </label>
                  <select
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    value={rateFilter}
                    onChange={(e) => setRateFilter(e.target.value)}
                  >
                    <option value="">Any Price</option>
                    <option value="0-25">$0 - $25</option>
                    <option value="25-50">$25 - $50</option>
                    <option value="50-75">$50 - $75</option>
                    <option value="75-100">$75 - $100</option>
                    <option value="100">$100+</option>
                  </select>
                </div>

                {/* Availability Filter */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Availability
                  </label>
                  <select
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    value={availabilityFilter}
                    onChange={(e) => setAvailabilityFilter(e.target.value)}
                  >
                    <option value="">Any Availability</option>
                    {uniqueAvailability.map((availability, index) => (
                      <option key={index} value={availability}>
                        {availability}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Location Filter */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Location
                  </label>
                  <select
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    value={locationFilter}
                    onChange={(e) => setLocationFilter(e.target.value)}
                  >
                    <option value="">Any Location</option>
                    {uniqueLocations.map((location, index) => (
                      <option key={index} value={location}>
                        {location}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Sort Options */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Sort By
                  </label>
                  <select
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    value={sortOption}
                    onChange={(e) => setSortOption(e.target.value)}
                  >
                    <option value="relevance">Relevance</option>
                    <option value="rating">Highest Rating</option>
                    <option value="price">Price: Low to High</option>
                    <option value="priceDesc">Price: High to Low</option>
                    <option value="recency">Most Recent</option>
                  </select>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Tutor Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredTutors.length > 0 ? (
            filteredTutors.map((tutor) => (
              <div
                key={tutor._id}
                className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden group"
              >
                {/* Profile Image */}
                <div className="relative h-48 w-full overflow-hidden">
                  <Image
                    src={tutor.image || "/placeholder-profile.jpg"}
                    alt={`${tutor.userId.name}'s profile`}
                    layout="fill"
                    objectFit="cover"
                    className="group-hover:scale-105 transition-transform duration-300"
                  />
                  {tutor.isVerified && (
                    <div className="absolute top-3 right-3 bg-green-500 text-white px-2 py-1 rounded-full text-xs font-semibold">
                      Verified
                    </div>
                  )}
                  {tutor.rates.discount > 0 && (
                    <div className="absolute top-3 left-3 bg-red-500 text-white px-2 py-1 rounded-full text-xs font-semibold">
                      {tutor.rates.discount}% OFF
                    </div>
                  )}
                </div>

                {/* Card Content */}
                <div className="p-6">
                  {/* Name and Rating */}
                  <div className="flex justify-between items-start mb-3">
                    <h3 className="text-xl font-bold text-gray-900 truncate">
                      {tutor.userId.name}
                    </h3>
                    <div className="flex items-center gap-1 bg-yellow-50 px-2 py-1 rounded-full">
                      <FaStar className="h-4 w-4 text-yellow-400" />
                      <span className="text-sm font-semibold text-gray-700">
                        {tutor.ratings.toFixed(1)}
                      </span>
                    </div>
                  </div>

                  {/* Subjects */}
                  <div className="mb-4">
                    <div className="flex items-center gap-2 mb-2">
                      <FaBookOpen className="h-4 w-4 text-blue-500" />
                      <span className="text-sm font-semibold text-gray-700">
                        Subjects
                      </span>
                    </div>
                    <div className="flex flex-wrap gap-1">
                      {tutor.subjects.slice(0, 3).map((subject, index) => (
                        <span
                          key={index}
                          className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs font-medium"
                        >
                          {subject}
                        </span>
                      ))}
                      {tutor.subjects.length > 3 && (
                        <span className="bg-gray-100 text-gray-600 px-2 py-1 rounded-full text-xs font-medium">
                          +{tutor.subjects.length - 3} more
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Location */}
                  {tutor.location && (
                    <div className="flex items-center gap-2 mb-3">
                      <FaMapMarkerAlt className="h-4 w-4 text-gray-500" />
                      <span className="text-sm text-gray-600">{tutor.location}</span>
                    </div>
                  )}

                  {/* Availability */}
                  {tutor.availability.length > 0 && (
                    <div className="flex items-center gap-2 mb-4">
                      <FaClock className="h-4 w-4 text-gray-500" />
                      <span className="text-sm text-gray-600">
                        {tutor.availability.slice(0, 2).join(", ")}
                        {tutor.availability.length > 2 && "..."}
                      </span>
                    </div>
                  )}

                  {/* Price */}
                  <div className="mb-4">
                    <div className="flex items-center gap-2">
                      <span className="text-2xl font-bold text-gray-900">
                        ${tutor.rates.hourlyRate}
                      </span>
                      <span className="text-sm text-gray-600">/hour</span>
                    </div>
                  </div>

                  {/* View Profile Button */}
                  <Link href={`/tutor/${tutor._id}`}>
                    <PrimaryButton className="w-full py-3 text-sm font-semibold bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors">
                      View Profile
                    </PrimaryButton>
                  </Link>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-full text-center py-16">
              <div className="max-w-md mx-auto">
                <div className="text-gray-400 mb-4">
                  <FaSearch className="h-12 w-12 mx-auto" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  No tutors found
                </h3>
                <p className="text-gray-600 mb-6">
                  Try adjusting your search criteria or filters to find more tutors.
                </p>
                {hasActiveFilters && (
                  <button
                    onClick={clearAllFilters}
                    className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    Clear All Filters
                  </button>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TutorPage;