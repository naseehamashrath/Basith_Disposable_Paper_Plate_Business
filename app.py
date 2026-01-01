from flask import Flask, render_template, request, jsonify
from models import db, Enquiry, Analytics
import os

app = Flask(__name__)

# Configuration
# Using SQLite for simplicity and resume demonstration
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///basith.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

# Initialize Database
db.init_app(app)

# Ensure tables exist
with app.app_context():
    db.create_all()

@app.route('/')
def home():
    """
    Serves the main landing page.
    """
    return render_template('index.html')

@app.route('/api/enquire', methods=['POST'])
def submit_enquiry():
    """
    API Endpoint to receive contact form submissions.
    """
    data = request.json
    
    # Basic Validation
    if not data or not data.get('name') or not data.get('phone'):
        return jsonify({"success": False, "error": "Name and Phone are required"}), 400

    try:
        new_enquiry = Enquiry(
            name=data.get('name'),
            phone=data.get('phone'),
            email=data.get('email', ''),
            product_interest=data.get('product_interest', 'General'),
            message=data.get('message', '')
        )
        db.session.add(new_enquiry)
        db.session.commit()
        return jsonify({"success": True, "message": "Enquiry received successfully!"}), 201
    except Exception as e:
        print(f"Error saving enquiry: {e}")
        return jsonify({"success": False, "error": "Internal Server Error"}), 500

@app.route('/api/track', methods=['POST'])
def track_analytics():
    """
    Ethical analytics tracking (no PII).
    """
    data = request.json
    try:
        new_event = Analytics(
            page_view=data.get('page', '/'),
            device_type=data.get('device', 'unknown')
        )
        db.session.add(new_event)
        db.session.commit()
        return jsonify({"success": True}), 200
    except Exception as e:
        # Analytics failure should not break the app
        print(f"Analytics error: {e}")
        return jsonify({"success": False}), 500

# -- RESUME/DEMO ONLY ROUTES --
@app.route('/admin/enquiries', methods=['GET'])
def view_enquiries():
    """
    Simple Admin View to see submitted data (For verification/demo).
    """
    enquiries = Enquiry.query.order_by(Enquiry.created_at.desc()).all()
    return jsonify([e.to_dict() for e in enquiries])

if __name__ == '__main__':
    # Running in debug mode for development
    app.run(debug=True, port=5000)
