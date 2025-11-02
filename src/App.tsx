import { useState } from 'react';
import { Navbar } from './components/Navbar';
import { AuthPage } from './components/AuthPage';
import { FeedPage } from './components/FeedPage';
import { ProfilePage } from './components/ProfilePage';
import { SearchPage } from './components/SearchPage';
import { NetworkPage } from './components/NetworkPage';
import { ChatPage } from './components/ChatPage';
import { ClubsPage } from './components/ClubsPage';
import { mockStudents, mockOpportunities, mockClubs, mockConversations, getCurrentUser } from './lib/mockData';
import { Student, Opportunity, Club } from './types';

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [activeTab, setActiveTab] = useState('feed');
  const [students, setStudents] = useState<Student[]>(mockStudents);
  const [opportunities, setOpportunities] = useState<Opportunity[]>(mockOpportunities);
  const [clubs, setClubs] = useState<Club[]>(mockClubs);
  const [viewingProfileId, setViewingProfileId] = useState<string | null>(null);
  
  const currentUserId = 'current';

  // Opportunity handlers
  const handleLike = (opportunityId: string) => {
    setOpportunities(opportunities.map(opp => {
      if (opp.id === opportunityId) {
        const isLiked = opp.likes.includes(currentUserId);
        return {
          ...opp,
          likes: isLiked 
            ? opp.likes.filter(id => id !== currentUserId)
            : [...opp.likes, currentUserId]
        };
      }
      return opp;
    }));
  };

  const handleSave = (opportunityId: string) => {
    setOpportunities(opportunities.map(opp => {
      if (opp.id === opportunityId) {
        const isSaved = opp.saved.includes(currentUserId);
        return {
          ...opp,
          saved: isSaved 
            ? opp.saved.filter(id => id !== currentUserId)
            : [...opp.saved, currentUserId]
        };
      }
      return opp;
    }));
  };

  const handleComment = (opportunityId: string, commentText: string) => {
    setOpportunities(opportunities.map(opp => {
      if (opp.id === opportunityId) {
        const currentUser = getCurrentUser();
        const newComment = {
          id: Date.now().toString(),
          authorId: currentUserId,
          authorName: currentUser.name,
          authorAvatar: currentUser.avatar,
          content: commentText,
          timestamp: new Date().toISOString()
        };
        return {
          ...opp,
          comments: [...opp.comments, newComment]
        };
      }
      return opp;
    }));
  };

  // Network handlers
  const handleConnect = (studentId: string) => {
    setStudents(students.map(student => {
      if (student.id === studentId) {
        return {
          ...student,
          pendingRequests: [...student.pendingRequests, currentUserId]
        };
      }
      return student;
    }));
    alert('Connection request sent!');
  };

  const handleAcceptRequest = (studentId: string) => {
    setStudents(students.map(student => {
      if (student.id === currentUserId) {
        return {
          ...student,
          connections: [...student.connections, studentId],
          pendingRequests: student.pendingRequests.filter(id => id !== studentId)
        };
      }
      if (student.id === studentId) {
        return {
          ...student,
          connections: [...student.connections, currentUserId]
        };
      }
      return student;
    }));
  };

  const handleRejectRequest = (studentId: string) => {
    setStudents(students.map(student => {
      if (student.id === currentUserId) {
        return {
          ...student,
          pendingRequests: student.pendingRequests.filter(id => id !== studentId)
        };
      }
      return student;
    }));
  };

  const handleMessage = (studentId: string) => {
    setActiveTab('chat');
  };

  const handleViewProfile = (studentId: string) => {
    setViewingProfileId(studentId);
    setActiveTab('profile');
  };

  // Club handlers
  const handleJoinClub = (clubId: string) => {
    setClubs(clubs.map(club => {
      if (club.id === clubId) {
        return {
          ...club,
          members: [...club.members, currentUserId]
        };
      }
      return club;
    }));
  };

  const handleLeaveClub = (clubId: string) => {
    setClubs(clubs.map(club => {
      if (club.id === clubId) {
        return {
          ...club,
          members: club.members.filter(id => id !== currentUserId)
        };
      }
      return club;
    }));
  };

  // Profile handlers
  const handleEditProfile = (updates: Partial<Student>) => {
    setStudents(students.map(student => {
      if (student.id === currentUserId) {
        return { ...student, ...updates };
      }
      return student;
    }));
  };

  // Auth handler
  const handleLogin = () => {
    setIsAuthenticated(true);
  };

  // Calculate unread messages
  const unreadCount = mockConversations.reduce((sum, conv) => sum + conv.unread, 0);

  if (!isAuthenticated) {
    return <AuthPage onLogin={handleLogin} />;
  }

  const currentUser = getCurrentUser();
  const displayedStudent = viewingProfileId 
    ? students.find(s => s.id === viewingProfileId) || currentUser
    : currentUser;

  // Reset viewing profile when switching tabs
  const handleTabChange = (tab: string) => {
    if (tab !== 'profile') {
      setViewingProfileId(null);
    }
    setActiveTab(tab);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar 
        activeTab={activeTab} 
        onTabChange={handleTabChange}
        unreadCount={unreadCount}
      />
      
      {activeTab === 'feed' && (
        <FeedPage
          opportunities={opportunities}
          currentUserId={currentUserId}
          onLike={handleLike}
          onSave={handleSave}
          onComment={handleComment}
        />
      )}

      {activeTab === 'search' && (
        <SearchPage
          students={students}
          currentUserId={currentUserId}
          onConnect={handleConnect}
          onViewProfile={handleViewProfile}
        />
      )}

      {activeTab === 'network' && (
        <NetworkPage
          students={students}
          currentUserId={currentUserId}
          onAcceptRequest={handleAcceptRequest}
          onRejectRequest={handleRejectRequest}
          onMessage={handleMessage}
          onViewProfile={handleViewProfile}
        />
      )}

      {activeTab === 'chat' && (
        <ChatPage
          conversations={mockConversations}
          students={students}
          currentUserId={currentUserId}
        />
      )}

      {activeTab === 'clubs' && (
        <ClubsPage
          clubs={clubs}
          students={students}
          currentUserId={currentUserId}
          onJoinClub={handleJoinClub}
          onLeaveClub={handleLeaveClub}
        />
      )}

      {activeTab === 'profile' && (
        <ProfilePage
          student={displayedStudent}
          isOwnProfile={displayedStudent.id === currentUserId}
          onEdit={handleEditProfile}
        />
      )}
    </div>
  );
}
