namespace :due_date_reminder do
  desc "Rake task to email authors when a drafted article is due in exactly 1 week"
  task send_email: :environment do
    articles = Article.all

    articles.each do |a|
      if !a.due_date.nil?
        due_date = a.due_date.at_end_of_day
        cur_date = Time.zone.now.at_end_of_day
        one_week_away = due_date - 1.week
        if one_week_away == cur_date
          ArticleMailer.with(user: a.user, article: a).due_date_email.deliver_now
        end
      end
    end

  end

end
