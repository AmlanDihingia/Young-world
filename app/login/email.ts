export function getWelcomeEmailHtml(fullName: string, communityType: string) {
  let displayCommunity = communityType ? communityType : "your community";
  if (communityType && !communityType.toLowerCase().includes('community')) {
    displayCommunity = `${communityType} Community`;
  }

  return `
  <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 40px 20px; color: #333; line-height: 1.6;">
    
    <p style="font-size: 16px; margin-bottom: 20px;">
      Hey ${fullName},
    </p>
    
    <p style="font-size: 16px; margin-bottom: 20px;">
      Thank you for checking in.
    </p>

    <p style="font-size: 16px; margin-bottom: 20px;">
      Today, <strong>${displayCommunity}</strong> officially became part of The World's Biggest Friendship Roll Call.
    </p>

    <p style="font-size: 16px; margin-bottom: 20px;">
      A simple idea.
    </p>

    <p style="font-size: 16px; margin-bottom: 20px;">
      That on Friendship Day, people from different cities, cultures and communities come together to remind one another that nobody should be left out.
    </p>

    <p style="font-size: 16px; margin-bottom: 30px;">
      And now your community is part of that story.
    </p>

    <p style="font-size: 24px; margin-bottom: 30px;">🤍</p>

    <p style="font-size: 16px; margin-bottom: 20px;">
      Over the coming weeks, we'll be welcoming new communities, discovering new cities and sharing the stories of the people helping bring this roll call to life.
    </p>

    <p style="font-size: 16px; margin-bottom: 20px;">
      We'll also be announcing <strong>${displayCommunity}</strong> on our pages so the world knows your community has checked in.
    </p>

    <p style="font-size: 16px; margin-bottom: 20px;">
      For now, we simply wanted to say thank you.
    </p>

    <p style="font-size: 16px; margin-bottom: 20px;">
      Thank you for making sure <strong>${displayCommunity}</strong> has a place in the roll call.
    </p>

    <p style="font-size: 16px; margin-bottom: 30px;">
      We're glad you're here.
    </p>

    <p style="font-size: 24px; margin-bottom: 30px;">🤍</p>

    <p style="font-size: 16px; margin-bottom: 10px;">
      — Uncle Young
    </p>

    <p style="font-size: 16px; margin-bottom: 10px;">
      The World's Biggest Friendship Roll Call
    </p>

    <p style="font-size: 16px; margin-bottom: 40px;">
      Wear White. Wave White. Pass It On.
    </p>

  </div>
  `;
}
